import axiosInstance from "@/lib/api";
import { useUserStore } from "@/store/user";
import type {
	CreateNewCustomerInput,
	CustomerDetails,
	CustomerIdDetailsResponse,
} from "@repo/types";
import { useMutation } from "@tanstack/react-query";

const useCustomerCreateNewCustomerDodo = () => {
	const setDodoCustomerDetails = useUserStore(
		(state) => state.setDodoCustomerDetails,
	);
	const handleCreateNewCustomer = async (
		customerData: CreateNewCustomerInput,
	): Promise<CustomerDetails> => {
		const response = await axiosInstance.post("/api/customer", customerData);
		setDodoCustomerDetails(response.data);
		return response.data;
	};

	const handleSuccess = (data: CustomerIdDetailsResponse) => {
		return data;
	};

	const handleError = (error: any) => {
		console.error("Error creating customer:", error);
		throw error;
	};

	const mutation = useMutation({
		mutationFn: handleCreateNewCustomer,
		onSuccess: handleSuccess,
		onError: handleError,
		mutationKey: ["createCustomerDodo"],
	});

	return mutation;
};

export default useCustomerCreateNewCustomerDodo;
