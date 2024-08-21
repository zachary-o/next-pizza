import axios from "axios"
import crypto from "crypto"
import {loadStripe} from "@stripe/stripe-js"
 

export async function createPayment(
  orderId: number,
  amount: number,
  email: string
) {
  if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined")
  }

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)
}
