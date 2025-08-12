import axiosInstance from "@/lib/api";
import type {
  DodoPaymentCreatePaymentInput,
  DodoPaymentCreatePaymentResponse,
} from "@repo/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreatePaymentMutation = () => {
  const handleCreatePayment = async (
    dodoPaymentCreatePaymentInput: DodoPaymentCreatePaymentInput,
  ): Promise<DodoPaymentCreatePaymentResponse> => {
    const apiPayload: DodoPaymentCreatePaymentInput = {
      ...dodoPaymentCreatePaymentInput,
    };
    const response = await axiosInstance.post("/api/payment", apiPayload);

    return response.data;
  };

  const handleSuccess = (data: DodoPaymentCreatePaymentResponse) => {
    return data;
  };

  const handleError = (error: any) => {
    toast.error(
      `Error creating payment: ${error.response?.data?.message || error.message}`,
    );
    console.error("Error creating payment:", error);
    throw error;
  };

  const mutation = useMutation({
    mutationFn: handleCreatePayment,
    onSuccess: handleSuccess,
    onError: handleError,
    mutationKey: ["createPayment"],
  });

  return mutation;
};

export default useCreatePaymentMutation;
