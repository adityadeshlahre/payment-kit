"use client";
import { authClient } from "@/lib/auth-client";
import SyncDodoCustomerButton from "@/components/sync-dodo-customer-button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCustomer } from "@/hooks/query/useCustomer";

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user.email;
  const page_size = searchParams.get("page_size")
    ? Number.parseInt(searchParams.get("page_size")!, 10)
    : undefined;

  const page_number = searchParams.get("page_number")
    ? Number.parseInt(searchParams.get("page_number")!, 10)
    : undefined;

  const params = { email, page_size, page_number };
  const { data: customerData, error } = useCustomer(params);

  useEffect(() => {
    if (!session && !isPending) {
      router.push("/login");
    }
  }, [session, isPending]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">Welcome {session?.user.name}</p>
      {customerData && <pre>{JSON.stringify(customerData, null, 2)}</pre>}
      {error && (
        <div className="text-red-500">Failed to load customer data</div>
      )}
    </div>
  );
}
