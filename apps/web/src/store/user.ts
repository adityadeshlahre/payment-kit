import type { CustomerDetails, UserAuthState } from "@repo/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialCustomerDetails: CustomerDetails = {
  business_id: "",
  created_at: "",
  customer_id: "",
  email: "",
  name: "",
  phone_number: "",
};

export const useUserStore = create<UserAuthState>()(
  persist(
    (set) => ({
      dodoCustomerDetails: initialCustomerDetails,

      setDodoCustomerDetails: (details: CustomerDetails) =>
        set({
          dodoCustomerDetails: {
            business_id: details.business_id,
            created_at: details.created_at,
            customer_id: details.customer_id,
            email: details.email,
            name: details.name,
            phone_number: details.phone_number || "",
          },
        }),

      clearDodoCustomerDetails: () =>
        set({
          dodoCustomerDetails: {
            business_id: "",
            created_at: "",
            customer_id: "",
            email: "",
            name: "",
            phone_number: "",
          },
        }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        dodoCustomerDetails: state.dodoCustomerDetails,
      }),
    },
  ),
);
