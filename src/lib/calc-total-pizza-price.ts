import { PizzaSize, PizzaType } from "@/constants/pizza"
import { Ingredient, ProductOption } from "@prisma/client"


/**
  * Calculates the total price of a pizza based on its type, size, and selected ingredients.
 * @param {ProductOption[]} productOptions - An array of available pizza options, each containing its type, size, and price.
 * @param {Ingredient[]} ingredients - An array of available ingredients, each containing its ID and price.
 * @param {PizzaType} type - The type of the pizza (e.g., "traditional" or "thin").
 * @param {PizzaSize} size - The size of the pizza (e.g., "SMALL", "MEDIUM", "LARGE").
 * @param {Set<number>} selectedIngredientsIds - A set of IDs of the selected ingredients.
 * @returns {number | undefined} - The total price of the pizza, or undefined if no matching pizza option is found.
 */
export const calcTotalPizzaPrice = (
  productOptions: ProductOption[],
  ingredients: Ingredient[],
  type: PizzaType,
  size: PizzaSize,
  selectedIngredientsIds: Set<number>
) => {
  const pizzaPrice = productOptions.find(
    (pizza) => pizza.pizzaType === type && pizza.size === size
  )?.price
  const ingredientsPrice = ingredients
    .filter((ingredient) => selectedIngredientsIds.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0)

  if (pizzaPrice) {
    return pizzaPrice + ingredientsPrice
  }
}
