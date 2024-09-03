"use client";

import { convertToSubcurrency } from "@/lib";
import { useCartStore } from "@/store";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Button } from "../ui";
import { createOrder } from "@/app/actions";

interface Props {
  className?: string;
}

export const PaymentForm: React.FC<Props> = ({ className }) => {
  const [subtotalAmount, checkoutFormData] = useCartStore((state) => [
    state.subtotalAmount,
    state.checkoutFormData,
  ]);
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

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
        setClientSecret(data.clientSecret);
      });
  }, [subtotalAmount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const paymentIntentResult = await stripe.retrievePaymentIntent(
      clientSecret
    );
    const paymentIntent = paymentIntentResult.paymentIntent;

    if (paymentIntent) {
      const paymentId = paymentIntent.id;
      await createOrder(checkoutFormData, paymentId, subtotalAmount);
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `https://next-pizza-snowy.vercel.app/payment-success?amount=${subtotalAmount}`,
      },
    });
    if (error) {
      setErrorMessage(error.message);
    } else {
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center mt-10">
        <div
          className="inline-block w-8 h-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !w-px !h-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
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
  );
};
