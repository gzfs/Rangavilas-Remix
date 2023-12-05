import { create } from "zustand";

export type CartStore = {
  existingCartID: string | undefined;
  setCartID: (cartID: string) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  existingCartID: undefined,
  setCartID: (cartID: string) =>
    set(() => ({
      existingCartID: cartID,
    })),
}));
