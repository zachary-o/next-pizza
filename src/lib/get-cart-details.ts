import { CartDTO } from "@/services/dto/cart.dto";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
  disabled?: boolean
};

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productOption.product.name,
    imageUrl: item.productOption.product.imageUrl,
    price: calcCartItemTotalPrice(item),
    pizzaSize: item.productOption.size,
    pizzaType: item.productOption.pizzaType,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
    disabled: false
  })) as CartStateItem[];

  return {
    totalAmount: data.totalAmount,
    items,
  };
};
