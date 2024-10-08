"use client"

import { cn } from "@/lib/utils"
import { useCartStore } from "@/store"
import { ArrowRight, ShoppingCart } from "lucide-react"
import { Button } from "../ui"
import { CartDrawer } from "./cart-drawer"

interface Props {
  className?: string
}

export const CartButton: React.FC<Props> = ({ className }) => {
  const [totalAmount, items, loading] = useCartStore((state) => [
    state.totalAmount,
    state.items,
    state.loading,
  ])

  return (
    <CartDrawer>
      <Button
        className={cn("group relative", { "w-[105px]": loading }, className)}
        loading={loading}
      >
        <b>${totalAmount}</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart className="relative" strokeWidth={2} size={16} />
          <b>{items.length}</b>
        </div>
        <ArrowRight
          className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
          size={20}
        />
      </Button>
    </CartDrawer>
  )
}
