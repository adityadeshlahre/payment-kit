"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/user";
import { useCustomer } from "@/hooks/query/useCustomer";
import { authClient } from "@/lib/auth-client";

export default function DodoCustomerDataHandler() {
  const { data: session } = authClient.useSession();
  const { data: customerData, isPending } = useCustomer({
    customerEmail: session?.user?.email,
  });

  useEffect(() => {
    if (!isPending) {
      if (customerData && customerData.items.length > 0) {
        const customer = customerData.items[0];
        useUserStore.getState().setDodoCustomerDetails(customer);
      } else {
        useUserStore.getState().clearDodoCustomerDetails();
      }
    }
  }, [customerData, isPending]);

  return null;
}
