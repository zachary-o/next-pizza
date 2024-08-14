import {
  Cart,
  CartItem,
  Ingredient,
  Product,
  ProductOption,
} from "@prisma/client";

export type CartItemDTO = CartItem & {
  productOption: ProductOption & {
    product: Product;
  };
  ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}


export interface CreateCartItemValues {
  productOptionId: number
  ingredients?: number[]
  quantity: number
}