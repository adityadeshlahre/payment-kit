"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/user";
import { useCustomer } from "@/hooks/query/useCustomer";
import { authClient } from "@/lib/auth-client";

export default function DodoCustomerDataHandler() {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const shouldFetchCustomer = !!session?.user?.email;
  
  const { data: customerData, isPending } = useCustomer(
    shouldFetchCustomer 
      ? { customerEmail: session.user.email }
      : undefined
  );

  useEffect(() => {
    if (session && !isPending) {
      if (customerData && customerData.items.length > 0) {
        const customer = customerData.items[0];
        useUserStore.getState().setDodoCustomerDetails(customer);
      } else {
        useUserStore.getState().clearDodoCustomerDetails();
      }
    } else if (!session && !sessionPending) {
      useUserStore.getState().clearDodoCustomerDetails();
    }
  }, [customerData, isPending, session, sessionPending]);

  return null;
}
