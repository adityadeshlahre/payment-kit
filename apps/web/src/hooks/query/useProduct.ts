import axiosInstance from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "@repo/constants";
import type { productDetails, productListResponse } from "@repo/types";

export const useProductsList = () => {
  const handleFetchProductsList = async (): Promise<productListResponse> => {
    const response = await axiosInstance.get("/api/product");
    return response.data;
  };

  const query = useQuery({
    queryKey: [queryKey.products],
    queryFn: handleFetchProductsList,
    staleTime: 5000,
    retry: 3,
  });

  return query;
};

export const useProduct = (productId: string) => {
  const handleFetchProduct = async (): Promise<productDetails> => {
    const response = await axiosInstance.get(`/api/product/${productId}`);
    return response.data;
  };

  const query = useQuery({
    queryKey: [queryKey.products, productId],
    queryFn: handleFetchProduct,
    staleTime: 5000,
    retry: 3,
  });

  return query;
};
