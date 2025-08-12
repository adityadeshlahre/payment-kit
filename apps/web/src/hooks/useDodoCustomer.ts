import { authClient } from "@/lib/auth-client";
import type { DodoCustomerData } from "@repo/types";

export const useDodoCustomer = () => {
    const { data: session, isPending, error } = authClient.useSession();

    // Type assertion to include our extended session properties
    const dodoCustomer: DodoCustomerData | null = (session?.session as any)?.dodo || null;

    return {
        dodoCustomer,
        isLoading: isPending,
        error,
        customerId: dodoCustomer?.customer_id,
        businessId: dodoCustomer?.business_id,
        isLinked: !!dodoCustomer,
    };
};
