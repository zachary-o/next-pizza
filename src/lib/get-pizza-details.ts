import { PizzaSize, PizzaType, mapPizzaType } from "@/constants/pizza";
import { Ingredient, ProductOption } from "@prisma/client";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";

export const getPizzaDetails = (
  size: PizzaSize,
  type: PizzaType,
  selectedIngredientsIds: Set<number>,
  productOptions: ProductOption[],
  ingredients: Ingredient[]
) => {
  const textDetails = `${size} cm, ${mapPizzaType[type]} dough`;

  const totalPrice = calcTotalPizzaPrice(
    productOptions,
    ingredients,
    type,
    size,
    selectedIngredientsIds
  );

  return { textDetails, totalPrice };
};
