import { Api } from "@/services/api-client"
import { Ingredient } from "@prisma/client"
import { useEffect, useState } from "react"

interface ReturnProps {
  ingredients: Ingredient[]
  loading: boolean
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true)
        const response = await Api.ingredients.getAll()
        setIngredients(response)
      } catch (error) {
        console.log("error", error)
      } finally {
        setLoading(false)
      }
    }

    fetchIngredients()
  }, [])

  return { ingredients, loading }
}
