"use client";
import { useState } from "react";
import axiosInstance from "@/lib/api";
import { useDodoCustomer } from "@/hooks/useDodoCustomer";

export default function SyncDodoCustomerButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { isLinked } = useDodoCustomer();

  const handleSync = async () => {
    if (isLinked) {
      setMessage("DodoPayments customer already synced!");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await axiosInstance.post("/api/sync-dodo-customer");
      setMessage("✅ DodoPayments customer synced successfully!");
      // Trigger a page refresh to see the updated session
      window.location.reload();
    } catch (error) {
      console.error("Sync failed:", error);
      setMessage("❌ Failed to sync DodoPayments customer");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLinked) {
    return (
      <div className="text-green-600 text-sm dark:text-black">
        ✓ DodoPayments customer already linked
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleSync}
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        {isLoading ? "Syncing..." : "Sync DodoPayments Customer"}
      </button>
      {message && <div className="text-sm">{message}</div>}
    </div>
  );
}
