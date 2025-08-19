import {
	CustomerDetails,
	loginViEmailReponse,
} from "../customers/customer-id-details";

export interface UserAuthState {
	user: loginViEmailReponse;
	dodoCusomerDetails: CustomerDetails;
	login: (user: loginViEmailReponse) => void;
	logout: () => void;
	setDodoCustomerDetails: (details: CustomerDetails) => void;
}
