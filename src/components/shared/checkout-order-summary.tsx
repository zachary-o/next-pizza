import { cn } from "@/lib/utils"
import { ArrowRight, Package, Percent, Truck } from "lucide-react"
import React from "react"
import { Button } from "../ui"
import { CheckoutItemDetails } from "./checkout-item-details"
import { WhiteBlock } from "./white-block"

interface Props {
  totalAmount: number
  className?: string
}

export const CheckoutOrderSummary: React.FC<Props> = ({
  totalAmount,
  className,
}) => {
  const VAT = 15
  const DELIVERY_PRICE = 5

  const vatPrice = (totalAmount * VAT) / 100
  const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE
  return (
    <WhiteBlock className={cn("p-6 sticky top-4", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Order Summary: </span>
        <span className="text-[34px] font-extrabold">${totalPrice}</span>
      </div>
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package className="mr-2 text-gray-300" size={18} />
            Items subtotal:
          </div>
        }
        value={`$${totalAmount}`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent className="mr-2 text-gray-300" size={18} />
            Tax:
          </div>
        }
        value={`$${vatPrice}`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck className="mr-2 text-gray-300" size={18} />
            Delivery:
          </div>
        }
        value={`$${DELIVERY_PRICE}`}
      />

      <Button
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
        type="submit"
      >
        Go to checkout <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  )
}
