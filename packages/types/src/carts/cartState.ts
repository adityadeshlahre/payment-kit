export interface CartState {
  cartItems: string[];
  isCartOpen: boolean;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  initializeCart: (items: string[]) => void;
  setCartOpen: (open: boolean) => void;
}
