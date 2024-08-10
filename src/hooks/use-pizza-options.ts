import { Variant } from "@/components/shared/group-variants";
import { PizzaSize, PizzaType } from "@/constants/pizza";
import { getAvailablePizzaSizes } from "@/lib";
import { ProductOption } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredientsIds: Set<number>;
  availablePizzaSizes: Variant[]
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  addIngredient: (id: number) => void;
}

export const usePizzaOptions = (
  productOptions: ProductOption[]
): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const [selectedIngredientsIds, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );
  const availablePizzaSizes = getAvailablePizzaSizes(productOptions, type);

  useEffect(() => {
    const isAvailableSize = availablePizzaSizes?.find(
      (pizza) => Number(pizza.value) === size && !pizza.disabled
    );
    const availableSize = availablePizzaSizes?.find((pizza) => !pizza.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    selectedIngredientsIds,
    availablePizzaSizes,
    setSize,
    setType,
    addIngredient,
  };
};
