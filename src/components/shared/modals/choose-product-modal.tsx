"use client"

import { Dialog, DialogContent, Title } from "@radix-ui/react-dialog"
import React from "react"
import { Product } from "@prisma/client"
import { cn } from "@/lib/utils"

interface Props {
  product: Product
  className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  return (
    <Dialog open={Boolean(product)}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        <Title>{product.name}</Title>
      </DialogContent>
    </Dialog>
  )
}
