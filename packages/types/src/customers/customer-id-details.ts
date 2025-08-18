import { z } from "zod";

export const customerId = z
  .string()
  .min(1, "Customer ID must be a non-empty string");

export const customerIdDetailsSchema = z.object({
  id: customerId,
});

export const customerIdDetailsResponseSchema = z.object({
  business_id: z.string(),
  created_at: z.string(),
  customer_id: z.string(),
  email: z.string(),
  name: z.string(),
  phone_number: z.string(),
});

export type CustomerIdDetailsInput = z.infer<typeof customerIdDetailsSchema>;

export interface customerListResponse {
  items: CustomerDetails[];
}

export const createNewCustomerSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone_number: z.string().optional(),
});

export type CreateNewCustomerResponse = z.infer<typeof createNewCustomerSchema>;

export const customerDetailsSchema = z.object({
  business_id: z.string(),
  created_at: z.string(),
  customer_id: z.string(),
  email: z.string(),
  name: z.string(),
  phone_number: z.string(),
});

export type CustomerDetailsResponse = z.infer<typeof customerDetailsSchema>;

export const customerListResponseSchema = z.object({
  items: z.array(customerDetailsSchema),
});

export interface CustomerDetails {
  business_id: string;
  created_at: string;
  customer_id: string;
  email: string;
  name: string;
  phone_number: string;
}

export const customerFetchViaEmailSchema = z.object({
  email: z.string().email("Invalid email format").optional(),
  page_number: z.int().min(1, "Page number must be at least 1").optional(),
  page_size: z.int().min(1, "Page size must be at least 1").optional(),
});

export type CustomerFetchViaEmailInput = z.infer<
  typeof customerFetchViaEmailSchema
>;

export type userEnvForMiddlware = {
	id: string;
	email: string;
	emailVerified: boolean;
	name: string;
	image: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface loginViEmailReponse {
  id: string;
  email: string;
  name: string;
  image: any;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
