"use client"

import {
  mapPizzaType,
  PizzaSize,
  pizzaSizes,
  PizzaType,
  pizzaTypes,
} from "@/constants/pizza"
import { calcTotalPizzaPrice } from "@/lib"
import { cn } from "@/lib/utils"
import { Ingredient, ProductOption } from "@prisma/client"
import React, { useEffect, useState } from "react"
import { useSet } from "react-use"
import { Button } from "../ui"
import { GroupVariants } from "./group-variants"
import { IngredientItem } from "./ingredient-item"
import { PizzaImage } from "./pizza-image"
import { Title } from "./title"

interface Props {
  imageUrl: string
  name: string
  ingredients: Ingredient[]
  productOptions: ProductOption[]
  addProductToCart: VoidFunction
  className?: string
}

export const ChoosePizzaForm: React.FC<Props> = ({
  imageUrl,
  name,
  ingredients,
  productOptions,
  addProductToCart,
  className,
}) => {
  const [size, setSize] = useState<PizzaSize>(20)
  const [type, setType] = useState<PizzaType>(1)

  const [selectedIngredientsIds, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  )

  const textDetails = `${size} cm, ${mapPizzaType[type]} dough`

  const totalPrice = calcTotalPizzaPrice(
    productOptions,
    ingredients,
    type,
    size,
    selectedIngredientsIds
  )

  const filteredPizzasByType = productOptions.filter(
    (pizza) => pizza.pizzaType === type
  )
  const availablePizzaSizes = pizzaSizes.map((pizza) => ({
    name: pizza.name,
    value: pizza.value,
    disabled: !filteredPizzasByType.some(
      (disabledPizza) => Number(disabledPizza.size) === Number(pizza.value)
    ),
  }))

  useEffect(() => {
    const isAvailableSize = availablePizzaSizes?.find(
      (pizza) => Number(pizza.value) === size && !pizza.disabled
    )
    const availableSize = availablePizzaSizes?.find((pizza) => !pizza.disabled)

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize)
    }
  }, [type])

  const handleAddToCart = () => {
    addProductToCart?.()
  }

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
          onClick={handleAddToCart}
        >
          Add to cart for ${totalPrice}
        </Button>
      </div>
    </div>
  )
}
