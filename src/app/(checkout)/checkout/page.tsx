"use client"

import { createOrder } from "@/app/actions"
import { CheckoutOrderSummary, Title } from "@/components/shared"
import {
  CheckoutAdditionalInfo,
  CheckoutCart,
  CheckoutPersonalInfo,
} from "@/components/shared/checkout-components"
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from "@/components/shared/checkout-components/checkout-form-schema"
import { useCart } from "@/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"

export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState(false)
  const {
    totalAmount,
    items,
    loading,
    updateCartItemQuantity,
    removeCartItem,
  } = useCart()

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  })

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1

    updateCartItemQuantity(id, newQuantity)
  }

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
    try {
      setSubmitting(true)
      const url = await createOrder(data)
      toast.success(
        "Order placed successfully! 📝Redirecting to the payment page...",
        { icon: "✅" }
      )

      if (url) {
        location.href = url
      }
    } catch (error) {
      console.log("error", error)
      setSubmitting(false)
      toast.error("Failed to checkout", { icon: "❌" })
    }
    createOrder(data)
  }

  return (
    <div className="mt-10">
      <Title className="font-extrabold mb-8 text-[36px]" text="Checkout" />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Left side */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                items={items}
                loading={loading}
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
              />
              <CheckoutPersonalInfo loading={loading} />
              <CheckoutAdditionalInfo loading={loading} />
            </div>

            {/* Right side */}
            <div className="w-[450px]">
              <CheckoutOrderSummary
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
