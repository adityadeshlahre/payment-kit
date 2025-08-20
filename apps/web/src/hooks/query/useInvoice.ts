import axiosInstance from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useInvoice = (paymentId: string) => {
  const handleFetchInvoice = async (): Promise<any> => {
    const response = await axiosInstance(`/api/payment/invoice/${paymentId}`);
    return response.data;
  };
  const query = useQuery({
    queryKey: ["invoice", paymentId],
    queryFn: () => handleFetchInvoice(),
    staleTime: 5000,
    retry: 3,
    enabled: !!paymentId,
  });
  return query;
};
