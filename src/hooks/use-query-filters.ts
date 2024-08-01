import { useRouter } from "next/navigation"
import qs from "qs"
import { useEffect } from "react"
import { Filters } from "./use-filters"

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter()

  useEffect(() => {
    const params = {
      ...filters.priceRange,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    }

    const queryString = qs.stringify(params, {
      arrayFormat: "comma",
    })
    router.push(`?${queryString}`, {
      scroll: false,
    })
  }, [
    filters.priceRange,
    filters.pizzaTypes,
    filters.sizes,
    filters.selectedIngredients,
    router,
  ])
}
