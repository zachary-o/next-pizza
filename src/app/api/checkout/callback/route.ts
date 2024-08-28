import { OrderSuccessTemplate } from "@/components/shared"
import { sendEmail } from "@/lib"
import { CartItemDTO } from "@/services/dto/cart.dto"
import { OrderStatus } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../../prisma/prisma-client"

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export async function POST(req: NextRequest) {
  
  const { paymentId } = await req.json()

  console.log("api checkout callback paymentId", paymentId)

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId)

    if (!paymentIntent) {
      console.log("Payment not found")
      return NextResponse.json({ error: "Payment not found" })
    }

    const order = await prisma.order.findFirst({
      where: {
        paymentId: paymentId,
      },
    })

    if (!order) {
      console.log("Order not found")
      return NextResponse.json({ error: "Order not found" })
    }

    const isSucceeded = paymentIntent.status === "requires_payment_method"
    console.log('paymentIntent', paymentIntent)

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELED,
      },
    })

    const items = JSON.parse(order?.items as string) as CartItemDTO[]

    if (isSucceeded) {
      await sendEmail(
        order.email,
        "Next Pizza | Your order has been successfully placed 🎉",
        OrderSuccessTemplate({ orderId: order.id, items })
      )
    } else {
    }
  } catch (error) {
    console.log("[Checkout Callback] Error: ", error)
    return NextResponse.json({ error: "Server Errorsssssss" })
  }
}
