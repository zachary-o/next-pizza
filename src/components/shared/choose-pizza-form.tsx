"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui";
import { ProductImage } from "./product-image";
import { Title } from "./title";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: any[];
  items?: any[];
  handleAddOnClick: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  imageUrl,
  name,
  ingredients,
  items,
  handleAddOnClick,
  className,
}) => {
  const textDetails = "Lorem ipsummmmmmm";
  const totalPrice = 20;

  return (
    <div className={cn("flex flex-1", className)}>
      <ProductImage imageUrl={imageUrl} size={30} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title className="font-extrabold mb-1" size="md" text={name} />

        <p className="text-gray-400">{textDetails}</p>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full">
          Add to cart for ${totalPrice}
        </Button>
      </div>
    </div>
  );
};
