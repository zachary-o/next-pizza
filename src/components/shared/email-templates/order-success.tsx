import { CartItemDTO } from "@/services/dto/cart.dto"
import React from "react"

interface Props {
  orderId: number
  items: CartItemDTO[]
  className?: string
}

export const OrderSuccessTemplate: React.FC<Props> = ({
  orderId,
  items,
  className,
}) => {
  return (
    <div className={className}>
      <h1>🍕 Thanks for your order! 🎉</h1>

      <p>Your order N#{orderId} has been paid. Items list:</p>
      <hr />
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.productOption.product.name} | ${item.productOption.price} x{" "}
            {item.quantity} = ${item.productOption.price * item.quantity}
          </li>
        ))}
      </ul>
    </div>
  )
}
