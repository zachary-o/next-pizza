"use client"

import { useCartStore } from "@/store"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { PropsWithChildren, useEffect } from "react"
import { Button } from "../ui"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { CartDrawerItem } from "./cart-drawer-item"
import { getCartItemDetails } from "@/lib"
import { PizzaSize, PizzaType } from "@/constants/pizza"

interface Props {
  className?: string
}

export const CartDrawer: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  const [
    totalAmount,
    items,
    fetchCartItems,
    updateCartItemQuantity,
    removeCartItem,
  ] = useCartStore((state) => [
    state.totalAmount,
    state.items,
    state.fetchCartItems,
    state.updateCartItemQuantity,
    state.removeCartItem,
  ])

  useEffect(() => {
    fetchCartItems()
  }, [])

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1

    updateCartItemQuantity(id, newQuantity)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
        <SheetHeader>
          <SheetTitle>
            <span className="fond-bold">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>{" "}
            in cart
          </SheetTitle>
        </SheetHeader>

        <div className="-mx-6 mt-5 overflow-auto flex-1">
          {items.map((item) => (
            <div className="mb-2" key={item.id}>
              <CartDrawerItem
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                details={
                  item.pizzaSize && item.pizzaType
                    ? getCartItemDetails(
                        item.pizzaType as PizzaType,
                        item.pizzaSize as PizzaSize,
                        item.ingredients
                      )
                    : ""
                }
                price={item.price}
                quantity={item.quantity}
                onClickCountButton={(type) =>
                  onClickCountButton(item.id, item.quantity, type)
                }
                onClickRemoveCartItem={() => removeCartItem(item.id)}
              />
            </div>
          ))}
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Total
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>
              <span className="font-bold text-lg">${totalAmount}</span>
            </div>
            <Link href="/cart">
              <Button className="w-full h-12 text-base" type="submit">
                Order
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
