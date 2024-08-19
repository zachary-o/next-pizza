import { CartStateItem } from "@/lib/get-cart-details"
import { CreateCartItemValues } from "@/services/dto/cart.dto"
import { useCartStore } from "@/store"
import { useEffect } from "react"

type ReturnProps = {
  totalAmount: number
  items: CartStateItem[]
  loading: boolean
  updateCartItemQuantity: (id: number, quantity: number) => Promise<void>
  removeCartItem: (id: number) => Promise<void>
  addCartItem: (calues: CreateCartItemValues) => Promise<void>
}

export const useCart = (): ReturnProps => {
  const cartState = useCartStore((state) => state)

  useEffect(() => {
    cartState.fetchCartItems()
  }, [])

  return cartState
}
