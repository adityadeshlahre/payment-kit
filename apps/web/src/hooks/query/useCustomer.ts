import axiosInstance from "@/lib/api";
import { queryKey } from "@repo/constants";
import type { customerListResponse } from "@repo/types";
import { useQuery } from "@tanstack/react-query";

export const useCustomersList = () => {
  const handleFetchCustomersList = async (): Promise<customerListResponse> => {
    const response = await axiosInstance.get("/api/customer");
    return response.data;
  };

  const query = useQuery({
    queryKey: ["customers"],
    queryFn: handleFetchCustomersList,
    staleTime: 5000,
    retry: 3,
  });

  return query;
};

export const useCustomer = (params?: {
  customerEmail?: string;
  page_size?: number;
  page_number?: number;
}) => {
  const handleFetchCustomer = async (): Promise<customerListResponse> => {
    const queryParams = new URLSearchParams();
    if (params?.customerEmail)
      queryParams.append("email", params.customerEmail);
    if (params?.page_size)
      queryParams.append("page_size", String(params.page_size));
    if (params?.page_number)
      queryParams.append("page_number", String(params.page_number));
    const response = await axiosInstance.get(
      `/api/customer?${queryParams.toString()}`,
    );
    return response.data;
  };

  const query = useQuery({
    queryKey: ["customer", params],
    queryFn: () => handleFetchCustomer(),
    staleTime: 5000,
    retry: 3,
  });

  return query;
};

export const useCustomerById = (customerId: string) => {
  const handlerFetchCustomerById = async (): Promise<customerListResponse> => {
    const response = await axiosInstance.get(`/api/customer/${customerId}`);
    return response.data;
  };

  const query = useQuery({
    queryKey: ["customerById", customerId],
    queryFn: () => handlerFetchCustomerById(),
    staleTime: 5000,
    retry: 3,
    enabled: !!customerId,
  });

  return query;
};
