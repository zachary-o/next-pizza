import { CheckoutFormValues } from "@/components/shared/checkout-components/checkout-form-schema";
import { CartStateItem, getCartDetails } from "@/lib/get-cart-details";
import { Api } from "@/services/api-client";
import { CreateCartItemValues } from "@/services/dto/cart.dto";
import { create } from "zustand";

export interface CartState {
  loading: boolean;
  error: boolean;
  subtotalAmount: number;
  totalAmount: number;
  items: CartStateItem[];
  checkoutFormData: CheckoutFormValues;

  // Fetches the cart items via an API call
  fetchCartItems: () => Promise<void>;

  // Updates the quantity of a specific cart item via an API call
  updateCartItemQuantity: (id: number, quantity: number) => Promise<void>;

  // Adds a new item to the cart via an API call
  addCartItem: (values: any) => Promise<void>;

  // Removes an item from the cart via an API call
  removeCartItem: (id: number) => Promise<void>;

  // Calculates subtotal amount to pay
  calculateSubtotal: (newSubtotal: number) => void;

  setCheckoutFormData: (data: CheckoutFormValues) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  loading: true,
  error: false,
  subtotalAmount: 0,
  totalAmount: 0,
  checkoutFormData: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    comment: "",
  },

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
      set((state) => ({
        loading: true,
        error: false,
        items: state.items.map((item) =>
          item.id === id ? { ...item, disabled: true } : item
        ),
      }));
      const data = await Api.cart.removeCartItem(id);
      set(getCartDetails(data));
    } catch (error) {
      console.log("error", error);
      set({ error: true });
    } finally {
      set((state) => ({
        loading: false,
        items: state.items.map((item) => ({ ...item, disabled: false })),
      }));
    }
  },
  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.addCartItem(values);
      set(getCartDetails(data));
    } catch (error) {
      console.log("error", error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  calculateSubtotal: (newSubtotal: number) => {
    set((state) => ({
      ...state,
      subtotalAmount: newSubtotal,
    }));
  },
  setCheckoutFormData: (data: CheckoutFormValues) => {
    set((state) => ({
      ...state,
      checkoutFormData: { ...state.checkoutFormData, ...data },
    }));
  },
}));
