"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store";
import React, { useEffect, useRef } from "react";
import { useIntersection } from "react-use";
import { ProductCard } from "./product-card";
import { Title } from "./title";

interface Props {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  listClassName?: string;
  className?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  categoryId,
  listClassName,
  className,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting, categoryId, setActiveCategoryId]);
  
  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title className="font-extrabold mb-5" size="lg" text={title} />

      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.productOptions[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
