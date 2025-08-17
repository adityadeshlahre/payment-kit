import type { CartState } from "@repo/types";
import { create } from "zustand";

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],

  isCartOpen: false,

  addToCart: (id) =>
    set((state) => {
      if (!state.cartItems.includes(id)) {
        const newCartItems = [...state.cartItems, id];
        localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        return { cartItems: newCartItems };
      }
      return state;
    }),

  removeFromCart: (id) =>
    set((state) => {
      const newCartItems = state.cartItems.filter((itemId) => itemId !== id);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      return { cartItems: newCartItems };
    }),

  clearCart: () => {
    localStorage.removeItem("cartItems");
    set({ cartItems: [] });
  },

  initializeCart: (items) => set({ cartItems: items }),

  setCartOpen: (open) => set({ isCartOpen: open }),
}));
