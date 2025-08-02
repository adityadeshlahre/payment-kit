"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function List() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [customerData, setCustomerData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("http://localhost:3000/api/customer", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.session?.token}`,
          },
        });

        const data = await response.json();
        console.log("Customer data:", data);

        if (!response.ok) {
          console.error("API Error:", response.status, data);
          setError(
            `API Error: ${response.status} - ${data.message || "Unknown error"}`
          );
        } else {
          setCustomerData(data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(
          `Fetch error: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.session?.token) {
      fetchCustomerData();
    }
  }, [session]);

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
    <div className="flex h-screen items-center justify-center">
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
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {customerData && (
          <div className="bg-gray-50 border rounded-lg p-4 text-left">
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
