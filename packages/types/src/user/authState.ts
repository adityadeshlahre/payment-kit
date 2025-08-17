import {
	CustomerDetails,
	loginViEmailReponse,
} from "../customers/customer-id-details";

export interface UserAuthState {
	user: loginViEmailReponse;
	dodoCusomerDetails: CustomerDetails;
}
