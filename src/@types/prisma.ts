import { Ingredient, Product, ProductOption } from "@prisma/client"

export type ProductWithRelations = Product & {
  productOptions: ProductOption[]
  ingredients: Ingredient[]
}
