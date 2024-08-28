"use client";

import { createOrder } from "@/app/actions";
import { CheckoutOrderSummary, Title } from "@/components/shared";
import {
  CheckoutAdditionalInfo,
  CheckoutCart,
  CheckoutPersonalInfo,
} from "@/components/shared/checkout-components";
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from "@/components/shared/checkout-components/checkout-form-schema";
import { useCart } from "@/hooks";
import { useCartStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const {
    totalAmount,
    subtotalAmount,
    items,
    loading,

    updateCartItemQuantity,
    removeCartItem,
    calculateSubtotal,
  } = useCart();
  const [paymentId, setCheckoutFormData] = useCartStore((state) => [
    state.paymentId,
    state.setCheckoutFormData,
  ]);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const VAT = 15;
  const DELIVERY_PRICE = 5;

  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;

    updateCartItemQuantity(id, newQuantity);
  };

  useEffect(() => {
    calculateSubtotal(totalPrice);
  }, [totalAmount, vatPrice, DELIVERY_PRICE]);

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (
    data: CheckoutFormValues
  ) => {
    try {
      setSubmitting(true);

      setCheckoutFormData(data);
      //NO PAYMENT ID HERE
      // await createOrder(data, paymentId, subtotalAmount);
      toast.success(
        "Order placed successfully! 📝Redirecting to the payment page...",
        { icon: "✅" }
      );
      router.push("/payment");
    } catch (error) {
      console.log("error", error);
      setSubmitting(false);
      toast.error("Failed to checkout", { icon: "❌" });
    }
  };

  return (
    <>
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
                  subtotalAmount={subtotalAmount}
                  vatPrice={vatPrice}
                  deliveryFee={DELIVERY_PRICE}
                  loading={loading || submitting}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
