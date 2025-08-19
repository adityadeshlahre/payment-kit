"use client";

import { usePayment } from "@/hooks/query/usePayment";
import { useSearchParams } from "next/navigation";
import type { IntentStatus } from "dodopayments/resources/payments";
import { VALID_STATUSES } from "@repo/types";

export default function Status() {
  const queryParams = useSearchParams();
  const paymentId = queryParams.get("payment_id");
  const status = queryParams.get("status");
  const { data: paymentData, isLoading, error } = usePayment(paymentId ?? "");

  if (!paymentId) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Error</h1>
          <p className="text-lg">Invalid payment id.</p>
        </div>
      </div>
    );
  }

  if (!status || !VALID_STATUSES.includes(status as IntentStatus)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Error</h1>
          <p className="text-lg">Invalid status.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{status}</h1>
        {/* <p className="text-lg">Your action was successful.</p> */}
      </div>

      <div>{paymentData?.status}</div>
    </div>
  );
}
