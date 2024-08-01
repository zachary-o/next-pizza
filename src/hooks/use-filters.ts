import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { useSet } from "react-use"

export interface PriceRange {
  priceFrom?: number
  priceTo?: number
}

export interface QueryFilters extends PriceRange {
  pizzaTypes: string
  sizes: string
  ingredients: string
}

export interface Filters {
  sizes: Set<string>
  pizzaTypes: Set<string>
  selectedIngredients: Set<string>
  priceRange: PriceRange
}

interface ReturnTypes extends Filters {
  handleUpdatePriceRange: (name: keyof PriceRange, value: number) => void
  togglePizzaSizes: (value: string) => void
  togglePizzaTypes: (value: string) => void
  toggleIngredients: (value: string) => void
}

export const useFilters = (): ReturnTypes => {
  const searchParams = useSearchParams()

  //   Ingredients filter
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(","))
  )

  //   Pizza sizes filter
  const [sizes, { toggle: togglePizzaSizes }] = useSet(
    new Set<string>(
      searchParams.has("sizes") ? searchParams.get("sizes")?.split(",") : []
    )
  )

  //   Dough types filter
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.has("pizzaTypes")
        ? searchParams.get("pizzaTypes")?.split(",")
        : []
    )
  )

  //   Price range filter
  const [priceRange, setPriceRange] = useState<PriceRange>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  })

  const handleUpdatePriceRange = (name: keyof PriceRange, value: number) => {
    setPriceRange({
      ...priceRange,
      [name]: value,
    })
  }

  return {
    selectedIngredients,
    sizes,
    pizzaTypes,
    priceRange,
    toggleIngredients,
    togglePizzaSizes,
    togglePizzaTypes,
    handleUpdatePriceRange,
  }
}
