"use client"

import { PaymentForm } from "@/components/shared"
import { convertToSubcurrency } from "@/lib"
import { useCartStore } from "@/store"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

export default function Payment() {
  const subtotalAmount = useCartStore(state => state.subtotalAmount)
  
  if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined")
  }

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: convertToSubcurrency(subtotalAmount),
        currency: "usd",
      }}
    >
      <PaymentForm />
    </Elements>
  )
}
