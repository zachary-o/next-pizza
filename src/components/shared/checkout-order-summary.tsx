import { cn } from "@/lib/utils"
import { ArrowRight, Package, Percent, Truck } from "lucide-react"
import React from "react"
import { Button, Skeleton } from "../ui"
import { CheckoutItemDetails } from "./checkout-item-details"
import { WhiteBlock } from "./white-block"

interface Props {
  totalAmount: number
  subtotalAmount: number
  vatPrice: number
  deliveryFee: number
  loading: boolean
  className?: string
}

export const CheckoutOrderSummary: React.FC<Props> = ({
  totalAmount,
  subtotalAmount,
  vatPrice,
  deliveryFee,
  loading,
  className,
}) => {
  
  return (
    <WhiteBlock className={cn("p-6 sticky top-4", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Order Summary: </span>
        {loading ? (
          <Skeleton className="w-48 h-11" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">${subtotalAmount}</span>
        )}
      </div>
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package className="mr-2 text-gray-300" size={18} />
            Items subtotal:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="w-16 h-6 rounded-[6px]" />
          ) : (
            `$${totalAmount}`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent className="mr-2 text-gray-300" size={18} />
            Tax:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="w-16 h-6 rounded-[6px]" />
          ) : (
            `$${vatPrice}`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck className="mr-2 text-gray-300" size={18} />
            Delivery:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="w-16 h-6 rounded-[6px]" />
          ) : (
            `$${deliveryFee}`
          )
        }
      />
        <Button
          className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
          type="submit"
          loading={loading}
        >
          Go to checkout <ArrowRight className="w-5 ml-2" />
        </Button>
    </WhiteBlock>
  )
}
