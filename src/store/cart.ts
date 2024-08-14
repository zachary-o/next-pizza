import { CartStateItem, getCartDetails } from "@/lib/get-cart-details";
import { Api } from "@/services/api-client";
import { create } from "zustand";

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  // Fetches the cart items via an API call
  fetchCartItems: () => Promise<void>;

  // Updates the quantity of a specific cart item via an API call
  updateCartItemQuantity: (id: number, quantity: number) => Promise<void>;

  // Adds a new item to the cart via an API call
  addCartItem: (values: any) => Promise<void>;

  // Removes an item from the cart via an API call
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  loading: true,
  error: false,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();
      set(getCartDetails(data));
    } catch (error) {
      console.log("error", error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  updateCartItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.updateCartItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (error) {
      console.log("error", error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  removeCartItem: async (id: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.removeCartItem(id);
      set(getCartDetails(data));
    } catch (error) {
      console.log("error", error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  addCartItem: async (values: any) => {},
}));
