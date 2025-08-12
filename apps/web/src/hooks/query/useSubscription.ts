import axiosInstance from "@/lib/api";
import type {
  SubscriptionListItem,
  SubscriptionListResponse,
} from "@repo/types";
import { useQuery } from "@tanstack/react-query";

export const useSubscriptionList = () => {
  const handleFetchSubscriptions =
    async (): Promise<SubscriptionListResponse> => {
      const response = await axiosInstance.get("/api/subscription");
      return response.data;
    };
  const query = useQuery({
    queryKey: ["subscriptions"],
    queryFn: handleFetchSubscriptions,
    staleTime: 5000,
    retry: 3,
  });

  return query;
};

export const useSubscription = (subscriptionId: string) => {
  const handleFetchSubscription = async (): Promise<SubscriptionListItem> => {
    const response = await axiosInstance.get(`/api/product/${subscriptionId}`);

    return response.data;
  };

  const query = useQuery({
    queryKey: ["subscription", subscriptionId],
    queryFn: handleFetchSubscription,
    staleTime: 5000,
    retry: 3,
  });

  return query;
};
