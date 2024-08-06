"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import React from "react"
import { ProductWithRelations } from "../../../@types/prisma"
import { ChoosePizzaForm } from "../choose-pizza-form"
import { ChooseProductForm } from "../choose-product-form"

interface Props {
  product: ProductWithRelations
  className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter()
  const isPizzaForm = Boolean(product.productOptions[0].pizzaType)
  
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
            addProductToCart={() => {}}
            productOptions={product.productOptions}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            addProductToCart={() => {}}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
