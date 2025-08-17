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

export const useCustomer = () => {
  const customerEmail = "user@gmail.com"; // <-- set or import dynamically
  const page_size = 10;
  const page_number = 1;

  const handleFetchCustomer = async (
    email: string,
    size: number,
    number: number,
  ): Promise<customerListResponse> => {
    const response = await axiosInstance.get(
      `/api/customer?email=${email}&page_size=${size}&page_number=${number}`,
    );
    return response.data;
  };

  const query = useQuery({
    queryKey: ["customer", customerEmail, page_size, page_number],
    queryFn: () => handleFetchCustomer(customerEmail, page_size, page_number),
    staleTime: 5000,
    retry: 3,
  });

  return query;
};

export const useCustomerById = (customerId: string) => {
  if (!customerId) {
    throw new Error("Customer ID is required");
  }

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
