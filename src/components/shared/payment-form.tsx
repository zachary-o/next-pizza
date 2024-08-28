"use client"

import { convertToSubcurrency } from "@/lib"
import { useCartStore } from "@/store"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useEffect, useState } from "react"
import { Button } from "../ui"
import { createOrder } from "@/app/actions"

interface Props {
  className?: string
}

export const PaymentForm: React.FC<Props> = ({ className }) => {
  const [subtotalAmount, checkoutFormData, setPaymentId] = useCartStore(state => [state.subtotalAmount, state.checkoutFormData, state.setPaymentId])
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string>()
  const [clientSecret, setClientSecret] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(subtotalAmount) }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret)
      })
  }, [subtotalAmount])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    if (!stripe || !elements) {
      return
    }

    const paymentIntentResult = await stripe.retrievePaymentIntent(clientSecret)
    const paymentIntent = paymentIntentResult.paymentIntent

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setErrorMessage(submitError.message)
      setLoading(false)
      return
    }

    if (paymentIntent) {
      const paymentId = paymentIntent.id
      setPaymentId(paymentId)
      await createOrder(checkoutFormData, paymentId, subtotalAmount)
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${subtotalAmount}`,
      }
    })
    if (error) {
      setErrorMessage(error.message)
    } else {
    }

    setLoading(false)
  }

  return (
    <form className="bg-white p-2 rounded-md mt-10" onSubmit={handleSubmit}>
      {clientSecret && <PaymentElement />}
      {errorMessage && <div>{errorMessage}</div>}
      <Button
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
        type="submit"
        disabled={!stripe || loading}
      >
        {!loading ? `Pay $${subtotalAmount}` : "Processing..."}
      </Button>
    </form>
  )
}
