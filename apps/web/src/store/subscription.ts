import { create } from "zustand";
import { persist } from "zustand/middleware";

const subscription_id = "";

type SubscriptionStore = {
  subscription_id: string;
  setSubscriptionId: (id: string) => void;
  clearSubscriptionId: () => void;
};

export const useSubscriptionStore = create(
  persist<SubscriptionStore>(
    (set) => ({
      subscription_id,
      setSubscriptionId: (id) => set({ subscription_id: id }),
      clearSubscriptionId: () => set({ subscription_id: "" }),
    }),
    { name: "subscription-store" },
  ),
);
