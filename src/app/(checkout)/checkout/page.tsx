"use client";

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
import { Api } from "@/services/api-client";
import { useCartStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
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
  const setCheckoutFormData = useCartStore(
    (state) => state.setCheckoutFormData
  );

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

  useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();

      const [firstName, lastName] = data.fullName.split(" ");
      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
      form.setValue("email", data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session]);

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
  );
}
