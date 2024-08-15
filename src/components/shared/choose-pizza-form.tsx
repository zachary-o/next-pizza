"use client";

import {
  PizzaSize,
  PizzaType,
  pizzaTypes
} from "@/constants/pizza";
import { usePizzaOptions } from "@/hooks";
import { getPizzaDetails } from "@/lib";
import { cn } from "@/lib/utils";
import { Ingredient, ProductOption } from "@prisma/client";
import React from "react";
import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import { IngredientItem } from "./ingredient-item";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  productOptions: ProductOption[];
  loading?: boolean
  onSubmit: (productOptionId: number, ingredients: number[]) => void
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  imageUrl,
  name,
  ingredients,
  productOptions,
  loading,
  onSubmit,
  className,
}) => {
  const {
    size,
    type,
    selectedIngredientsIds,
    availablePizzaSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(productOptions);
  const { textDetails, totalPrice } = getPizzaDetails(
    size,
    type,
    selectedIngredientsIds,
    productOptions,
    ingredients
  );

  const handleAddToCart = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredientsIds));
    }
  };

  return (
    <div className={cn("flex flex-1", className)}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title className="font-extrabold mb-1" size="md" text={name} />

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={availablePizzaSizes}
            selectedValue={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={pizzaTypes}
            selectedValue={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                active={selectedIngredientsIds.has(ingredient.id)}
                onClick={() => addIngredient(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          loading={loading}
          onClick={handleAddToCart}
        >
          Add to cart for ${totalPrice}
        </Button>
      </div>
    </div>
  );
};
