"use client"

import React, { useEffect, useRef } from "react"
import { Title } from "./title"
import { cn } from "@/lib/utils"
import { ProductCard } from "./product-card"
import { useIntersection } from "react-use"
import { useCategoryStore } from "../../../store/category"

interface Props {
  title: string
  items: any[]
  categoryId: number
  listClassName?: string
  className?: string
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  categoryId,
  listClassName,
  className,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  })

  useEffect(() => {
    if (intersection?.isIntersecting) {
      console.log(title)
    }
  }, [intersection?.isIntersecting])

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title className="font-extrabold mb-5" size="lg" text={title} />

      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((product, index) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
          />
        ))}
      </div>
    </div>
  )
}
