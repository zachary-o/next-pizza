"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/store";
import toast from "react-hot-toast";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";

interface Props {
  product: ProductWithRelations;
  closeModal?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, closeModal }) => {
  const [loading, addCartItem] = useCartStore((state) => [
    state.loading,
    state.addCartItem,
  ]);
  const firstItem = product.productOptions[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onSubmit = async (productOptionId?: number, ingredients?: number[]) => {
    try {
      const itemId = productOptionId ?? firstItem.id;

      await addCartItem({
        productOptionId: itemId,
        ingredients,
      });

      toast.success("Product added to cart");
      closeModal?.( );
    } catch (error) {
      toast.error("Failed to add pizza to cart");
      console.error(error);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        productOptions={product.productOptions}
        loading={loading}
        onSubmit={onSubmit}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      price={firstItem.price}
      loading={loading}
      onSubmit={onSubmit}
    />
  );
};
