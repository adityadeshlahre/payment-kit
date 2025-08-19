import axiosInstance from "@/lib/api";
import type { PaymentIdDetailsResponse } from "@repo/types";
import { useQuery } from "@tanstack/react-query";

export const usePayment = (paymentId: string) => {
  if (!paymentId) {
    throw new Error("Payment ID is required");
  }
  const handleFetchPayment = async (): Promise<PaymentIdDetailsResponse> => {
    const response = await axiosInstance(`/api/payment/${paymentId}`);
    return response.data;
  };
  const query = useQuery({
    queryKey: ["payment", paymentId],
    queryFn: () => handleFetchPayment(),
    staleTime: 5000,
    retry: 3,
    enabled: !!paymentId,
  });
  return query;
};
