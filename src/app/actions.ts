"use server";

import {
  PayOrderEmailTemplate,
  UserVerificationEmailTemplate,
} from "@/components/shared";
import { CheckoutFormValues } from "@/components/shared/checkout-components/checkout-form-schema";
import { sendEmail } from "@/lib";
import { getUserSession } from "@/lib/get-user-session";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";
import { prisma } from "../../prisma/prisma-client";

export async function createOrder(
  data: CheckoutFormValues,
  paymentId: string,
  subtotalAmount: number
) {
  try {
    const cookiesStore = cookies();
    const cartToken = cookiesStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    // Search cart by token
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productOption: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    // Throw error if cart not found
    if (!userCart) {
      throw new Error("Cart not found");
    }

    // Throw error if cart is empty
    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    // Place an order
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment || "",
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    // Reset cart
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId,
      },
    });

    await sendEmail(
      data.email,
      "Next Pizza | Pay for the order N#" + order.id,
      PayOrderEmailTemplate({
        orderId: order.id,
        totalAmount: subtotalAmount,
      })
    );

    await fetch("http://localhost:3000/api/checkout/callback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paymentId: paymentId }),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  } catch (error) {
    console.log("[CreateOrder] Server Error", error);
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("User not found");
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : findUser?.password,
      },
    });
  } catch (error) {
    console.log("[UPDATE USER] Error: ", error);
    throw error;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error("Email has not been confirmed");
      }
      throw new Error("Email already exists");
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      "Next Pizza | User Verification",
      UserVerificationEmailTemplate({ code })
    );
  } catch (error) {
    console.log("[SIGN UP USER] Error: ", error);
    throw error;
  }
}
