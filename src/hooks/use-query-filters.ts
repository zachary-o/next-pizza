import { useRouter } from "next/navigation"
import qs from "qs"
import { useEffect, useRef } from "react"
import { Filters } from "./use-filters"

export const useQueryFilters = (filters: Filters) => {
  const isMounted = useRef(false)
  const router = useRouter()

  useEffect(() => {
    if (isMounted.current) {
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
    }
    isMounted.current = true
  }, [
    filters.priceRange,
    filters.pizzaTypes,
    filters.sizes,
    filters.selectedIngredients,
    router,
  ])
}
