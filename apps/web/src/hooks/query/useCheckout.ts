import axiosInstance from "@/lib/api";
import { queryKey } from "@repo/constants";
import type { PaymentIdDetailsResponse } from "@repo/types";
import { useQuery } from "@tanstack/react-query";

const useCheckout = (productId: string) => {
  const handleCheckout = async (
    productId: string,
  ): Promise<PaymentIdDetailsResponse> => {
    const response = await axiosInstance.get(
      `/api/checkout?productId=${productId}`,
    );
    return response.data;
  };

  const query = useQuery({
    queryKey: [queryKey.checkout, productId],
    queryFn: () => handleCheckout(productId),
    staleTime: 5000,
    retry: 3,
  });

  return query;
};

export default useCheckout;
