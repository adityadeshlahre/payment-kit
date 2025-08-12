"use client";
import { authClient } from "@/lib/auth-client";
import { useDodoCustomer } from "@/hooks/useDodoCustomer";
import SyncDodoCustomerButton from "@/components/sync-dodo-customer-button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const { dodoCustomer, customerId, isLinked } = useDodoCustomer();

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

      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-2 dark:text-black">DodoPayments Integration</h2>
        {isLinked ? (
          <div>
            <p className="text-green-600">✓ DodoPayments account linked</p>
            <p className="text-sm text-gray-600">Customer ID: {customerId}</p>
            <p className="text-sm text-gray-600">
              Email: {dodoCustomer?.email}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-yellow-600 mb-2">
              ⚠ DodoPayments account not linked
            </p>
            <SyncDodoCustomerButton />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <a
          href="/dashboard/dodo-info"
          className="block text-blue-500 hover:text-blue-700 underline"
        >
          View detailed DodoPayments information →
        </a>
        <a
          href="/dashboard/list"
          className="block text-blue-500 hover:text-blue-700 underline"
        >
          View payment list →
        </a>
      </div>
    </div>
  );
}
