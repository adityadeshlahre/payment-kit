import axiosInstance from "@/lib/api";
import { useSubscriptionStore } from "@/store/subscription";
import type {
  DodoPaymentSubscriptionCreatePaymentInput,
  DodoPaymentSubscriptionCreatePaymentResponse,
} from "@repo/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreateSubscriptionMutation = () => {
  const setSubscriptionId = useSubscriptionStore(
    (state) => state.setSubscriptionId,
  );
  const handleCreateSubscription = async (
    dodoPaymentSubscriptionCreatePaymentInput: DodoPaymentSubscriptionCreatePaymentInput,
  ): Promise<DodoPaymentSubscriptionCreatePaymentResponse> => {
    const apiPayload: DodoPaymentSubscriptionCreatePaymentInput = {
      ...dodoPaymentSubscriptionCreatePaymentInput,
    };

    const response = await axiosInstance.post("/api/subscription", apiPayload);

    return response.data;
  };

  const handleSuccess = (
    data: DodoPaymentSubscriptionCreatePaymentResponse,
  ) => {
    setSubscriptionId(data.subscription_id);
    return data;
  };
  const handleError = (error: any) => {
    toast.error(
      `Error creating subscription: ${error.response?.data?.message || error.message}`,
    );
    console.error("Error creating subscription:", error);
    throw error;
  };

  const mutation = useMutation({
    mutationFn: handleCreateSubscription,
    onSuccess: handleSuccess,
    onError: handleError,
    mutationKey: ["createSubscription"],
  });

  return mutation;
};

export default useCreateSubscriptionMutation;
