import { Cart, CartItem, Ingredient, Product, ProductOption } from "@prisma/client";

export type CartItemDTO = CartItem & {
    productItem: ProductOption & {
        product: Product
    }
    ingredients: Ingredient[]
}

export interface CartDTO extends Cart {
    items: CartItemDTO[]
}