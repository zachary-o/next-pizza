import { CartStateItem } from "@/lib/get-cart-details"
import { CreateCartItemValues } from "@/services/dto/cart.dto"
import { useCartStore } from "@/store"
import { useEffect } from "react"

type ReturnProps = {
  subtotalAmount: number
  totalAmount: number
  items: CartStateItem[]
  loading: boolean
  paymentId: string
  updateCartItemQuantity: (id: number, quantity: number) => Promise<void>
  removeCartItem: (id: number) => Promise<void>
  addCartItem: (calues: CreateCartItemValues) => Promise<void>
  calculateSubtotal: (newSubtotal: number) => void
  setPaymentId: (id: string) => void
}

export const useCart = (): ReturnProps => {
  const cartState = useCartStore((state) => state)

  useEffect(() => {
    cartState.fetchCartItems()
  }, [])

  return cartState
}
