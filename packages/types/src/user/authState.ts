import { CustomerDetails } from "../customers/customer-id-details";

export interface UserAuthState {
  dodoCustomerDetails: CustomerDetails;
  setDodoCustomerDetails: (details: CustomerDetails) => void;
  clearDodoCustomerDetails: () => void;
}
