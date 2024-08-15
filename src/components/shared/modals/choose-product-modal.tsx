"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useCartStore } from "@/store"
import { useRouter } from "next/navigation"
import React from "react"
import toast from "react-hot-toast"
import { ProductWithRelations } from "../../../@types/prisma"
import { ChoosePizzaForm } from "../choose-pizza-form"
import { ChooseProductForm } from "../choose-product-form"

interface Props {
  product: ProductWithRelations
  className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter()
  const firstItem = product.productOptions[0]
  const isPizzaForm = Boolean(firstItem.pizzaType)
  const [loading, addCartItem] = useCartStore(state => [state.loading, state.addCartItem])

  const onAddProduct = () => {
    addCartItem({
      productOptionId: firstItem.id
    })
  }

  const onAddPizza = async (productOptionId: number, ingredients?: number[]) => {
    try {
      await addCartItem({
        productOptionId,
        ingredients
      })
      toast.success("Pizza added to cart")
      router.back()
    } catch (error) {
      toast.error("Failed to add pizza to cart")
      console.error(error)
    }

  }

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[540px] bg-white overflow-hidden",
          className
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            productOptions={product.productOptions}
            loading={loading}
            onSubmit={onAddPizza}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstItem.price}
            loading={loading}
            onSubmit={onAddProduct}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
