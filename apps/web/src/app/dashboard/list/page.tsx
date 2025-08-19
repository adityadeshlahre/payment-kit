"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCustomersList } from "@/hooks/query/useCustomer";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function List() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const { data: customerData, isLoading, error } = useCustomersList();

  if (isPending) {
    return <Skeleton className="h-9 w-24" />;
  }

  if (!session) {
    return (
      <Button variant="outline" asChild>
        <Link href="/login">Sign In</Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="text-center max-w-2xl w-full p-6">
        <h1 className="text-4xl font-bold mb-4">Customer List</h1>
        <p className="text-lg mb-6">
          Fetching customer data from DodoPayments API
        </p>

        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800 text-sm">{error.message}</p>
          </div>
        )}

        {customerData && (
          <div className="bg-gray-700 border rounded-lg p-4 text-left">
            <h3 className="font-semibold mb-2">Customer Data:</h3>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(customerData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
