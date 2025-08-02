import { z } from "zod";

const countryCodeSchema = z.enum(["US", "IN", "CA"]);

const BillingAddressSchema = z.object({
  city: z.string().min(1, "City is required"),
  country: countryCodeSchema,
  state: z.string().min(1, "State is required"),
  street: z.string().min(1, "Street address is required"),
  zipcode: z.string().min(1, "ZIP code is required"),
});

const AttachExistingCustomerSchema = z.object({
  customer_id: z.string(),
});

const ProductCartItemSchema = z.object({
  product_id: z.string(),
  quantity: z.number(),
});

export const dodoPaymentCreatePaymentSchema = z.object({
  billing: BillingAddressSchema,
  customer: AttachExistingCustomerSchema,
  product_cart: z.array(ProductCartItemSchema),
});

export type BillingAddressInput = z.infer<typeof BillingAddressSchema>;

export type AttachExistingCustomerInput = z.infer<
  typeof AttachExistingCustomerSchema
>;

export type ProductCartItemInput = z.infer<typeof ProductCartItemSchema>;

export type DodoPaymentCreatePaymentInput = z.infer<
  typeof dodoPaymentCreatePaymentSchema
>;

export interface DodoPaymentCreatePaymentResponse {
  client_secret: string;
  customer: Customer;
  discount_id: string;
  expires_on: string;
  metadata: Metadata;
  payment_id: string;
  payment_link: string;
  product_cart: ProductCart[];
  total_amount: number;
}

export interface Customer {
  customer_id: string;
  email: string;
  name: string;
}

export interface Metadata {
  [key: string]: string; // or `any` if needed
}

export interface ProductCart {
  amount: number;
  product_id: string;
  quantity: number;
}
