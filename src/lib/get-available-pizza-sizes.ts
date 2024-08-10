import { Variant } from "@/components/shared/group-variants";
import { pizzaSizes, PizzaType } from "@/constants/pizza";
import { ProductOption } from "@prisma/client";

export const getAvailablePizzaSizes = (
  productOptions: ProductOption[],
  type: PizzaType
): Variant[] => {
  const filteredPizzasByType = productOptions.filter(
    (pizza) => pizza.pizzaType === type
  );

  return pizzaSizes.map((pizza) => ({
    name: pizza.name,
    value: pizza.value,
    disabled: !filteredPizzasByType.some(
      (disabledPizza) => Number(disabledPizza.size) === Number(pizza.value)
    ),
  }));
};
