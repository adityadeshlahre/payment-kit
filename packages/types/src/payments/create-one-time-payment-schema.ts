import { z } from "zod";

import type { CountryCode } from "dodopayments/resources/misc";

const BillingAddressSchema = z.object({
  city: z.string().min(1, "City is required"),
  country: z.custom<CountryCode>().meta({ type: "string", example: "US" }),
  // country: z.enum(["IN", "US"]),
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

export const dodoPaymentSubscriptionCreatePaymentSchema = z.object({
  billing: BillingAddressSchema,
  customer: AttachExistingCustomerSchema,
  product_id: z.string(),
  quantity: z.number(),
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
  amount?: number;
  product_id: string;
  quantity: number;
}

export type DodoPaymentSubscriptionCreatePaymentInput = z.infer<
  typeof dodoPaymentSubscriptionCreatePaymentSchema
>;

export interface DodoPaymentSubscriptionCreatePaymentResponse {
  addons: Addon[];
  client_secret: string;
  customer: Customer;
  discount_id: string;
  expires_on: string;
  metadata: Metadata;
  payment_id: string;
  payment_link: string;
  recurring_pre_tax_amount: number;
  subscription_id: string;
}

export interface Addon {
  addon_id: string;
  quantity: number;
}

export interface Customer {
  customer_id: string;
  email: string;
  name: string;
}
