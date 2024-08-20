import { PizzaSize, PizzaType } from "@/constants/pizza"
import { getCartItemDetails } from "@/lib"
import { CartStateItem } from "@/lib/get-cart-details"
import React from "react"
import { CheckoutItem } from "../checkout-item"
import { WhiteBlock } from "../white-block"
import { CheckoutItemSkeleton } from "../checkout-item-skeleton"

interface Props {
  items: CartStateItem[]
  loading?: boolean
  onClickCountButton: (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => void
  removeCartItem: (id: number) => void
  className?: string
}

export const CheckoutCart: React.FC<Props> = ({
  items,
  loading,
  onClickCountButton,
  removeCartItem,
  className,
}) => {
  return (
    <WhiteBlock title="1. Cart">
      <div className="flex flex-col gap-5">
        {loading
          ? [...Array(4)].map((_, index) => (
              <CheckoutItemSkeleton key={index} />
            ))
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                details={getCartItemDetails(
                  item.ingredients,
                  item.pizzaType as PizzaType,
                  item.pizzaSize as PizzaSize
                )}
                disabled={item.disabled}
                onClickCountButton={(type) =>
                  onClickCountButton(item.id, item.quantity, type)
                }
                onClickRemoveCheckoutItem={() => removeCartItem(item.id)}
              />
            ))}
      </div>
    </WhiteBlock>
  )
}
