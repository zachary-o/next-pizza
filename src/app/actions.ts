"use server"

import { CheckoutFormValues } from "@/components/shared/checkout-components/checkout-form-schema"
import { prisma } from "../../prisma/prisma-client"
import { OrderStatus } from "@prisma/client"
import { cookies } from "next/headers"
import { sendEmail } from "@/lib"
import { PayOrderEmailTemplate } from "@/components/shared"

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookiesStore = cookies()
    const cartToken = cookiesStore.get("cartToken")?.value

    if (!cartToken) {
      throw new Error("Cart token not found")
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
    })

    // Throw error if cart not found
    if (!userCart) {
      throw new Error("Cart not found")
    }

    // Throw error if cart is empty
    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty")
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
    })

    // Reser cart
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    })

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    })

    await sendEmail(
      data.email,
      "Next Pizza | Pay for the order N#" + order.id,
      PayOrderEmailTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: "https://wayforpay.com/uk/demo-shop",
      })
    )
  } catch (error) {
    console.log("[CreateOrder] Server Error", error)
  }
}
