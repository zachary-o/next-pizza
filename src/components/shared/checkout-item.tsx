import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import React from "react"
import * as CartItem from "./cart-item-details"
import { CartItemProps } from "./cart-item-details/cart-item-details.types"

interface Props extends CartItemProps {
  onClickCountButton: (type: "plus" | "minus") => void
  onClickRemoveCheckoutItem: () => void
  className?: string
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  disabled,
  onClickCountButton,
  onClickRemoveCheckoutItem,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        { "opacity-50 pointer-events-none": disabled },
        className
      )}
    >
      <div className="flex items-center gap-5 flex-1">
        <CartItem.Image src={imageUrl} />
        <CartItem.Info name={name} details={details} />
      </div>

      <CartItem.Price value={price} />

      <div className="flex items-center gap-5 ml-20">
        <CartItem.CountButton onClick={onClickCountButton} value={quantity} />
        <button type="button" onClick={onClickRemoveCheckoutItem}>
          <X
            className="text-gray-400 cursor-pointer hover:text-gray-600"
            size={20}
          />
        </button>
      </div>
    </div>
  )
}
