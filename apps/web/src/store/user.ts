import type {
  CustomerDetails,
  loginViEmailReponse,
  UserAuthState,
} from "@repo/types";
import { create } from "zustand";

export const useUserStore = create<UserAuthState>((set) => ({
  user: {
    id: "",
    email: "",
    name: "",
    image: "",
    emailVerified: false,
    createdAt: "",
    updatedAt: "",
  },

  login: (user: loginViEmailReponse) => set({ user: user }),

  logout: () =>
    set({
      user: {
        id: "",
        email: "",
        name: "",
        image: "",
        emailVerified: false,
        createdAt: "",
        updatedAt: "",
      },
    }),

  dodoCusomerDetails: {
    business_id: "",
    created_at: "",
    customer_id: "",
    email: "",
    name: "",
    phone_number: "",
  } as CustomerDetails,

  setDodoCustomerDetails: (details: CustomerDetails) =>
    set({
      dodoCusomerDetails: {
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
      dodoCusomerDetails: {
        business_id: "",
        created_at: "",
        customer_id: "",
        email: "",
        name: "",
        phone_number: "",
      },
    }),
}));
