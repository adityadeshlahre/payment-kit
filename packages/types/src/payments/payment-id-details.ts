import { z } from "zod";
import {
  Addon,
  AddonSchema,
  BillingAddressSchema,
  Customer,
  CustomerSchema,
  Metadata,
  MetadataSchema,
  ProductCart,
} from "./create-one-time-payment-schema";
import { Addons } from "dodopayments/resources/addons";

const paymentId = z.string().min(1, "Payment ID is required");

export const paymentIdDetailsSchema = z.object({
  id: paymentId,
});

export type PaymentIdDetailsInput = z.infer<typeof paymentIdDetailsSchema>;

export interface PaymentIdDetailsResponse {
  billing: Billing;
  brand_id: string;
  business_id: string;
  card_issuing_country: any;
  card_last_four: string;
  card_network: string;
  card_type: string;
  created_at: string;
  currency: string;
  customer: Customer;
  digital_products_delivered: boolean;
  discount_id: string;
  disputes: Dispute[];
  error_code: string;
  error_message: string;
  metadata: Metadata;
  payment_id: string;
  payment_link: string;
  payment_method: string;
  payment_method_type: string;
  product_cart: ProductCart[];
  refunds: Refund[];
  settlement_amount: number;
  settlement_currency: string;
  settlement_tax: number;
  status: any;
  subscription_id: string;
  tax: number;
  total_amount: number;
  updated_at: string;
}

export interface Billing {
  city: string;
  country: string;
  state: string;
  street: string;
  zipcode: string;
}

export interface Dispute {
  amount: string;
  business_id: string;
  created_at: string;
  currency: string;
  dispute_id: string;
  dispute_stage: string;
  dispute_status: string;
  payment_id: string;
  remarks: string;
}

export interface Refund {
  amount: number;
  business_id: string;
  created_at: string;
  currency: any;
  is_partial: boolean;
  payment_id: string;
  reason: string;
  refund_id: string;
  status: string;
}

export interface subscriptionPaymentIdDetailsResponse {
  addons: Addon[];
  billing: Billing;
  cancel_at_next_billing_date: boolean;
  cancelled_at: string;
  created_at: string;
  currency: string;
  customer: Customer;
  discount_id: string;
  metadata: Metadata;
  next_billing_date: string;
  on_demand: boolean;
  payment_frequency_count: number;
  payment_frequency_interval: string;
  previous_billing_date: string;
  product_id: string;
  quantity: number;
  recurring_pre_tax_amount: number;
  status: string;
  subscription_id: string;
  subscription_period_count: number;
  subscription_period_interval: string;
  tax_inclusive: boolean;
  trial_period_days: number;
}

export const subscriptionPaymentIdDetailsResponseSchema = z.object({
  addons: AddonSchema,
  billing: BillingAddressSchema,
  cancel_at_next_billing_date: z.boolean(),
  cancelled_at: z.string(),
  created_at: z.string(),
  currency: z.string(),
  customer: CustomerSchema,
  discount_id: z.string(),
  metadata: MetadataSchema,
  next_billing_date: z.string(),
  on_demand: z.boolean(),
  payment_frequency_count: z.number(),
  payment_frequency_interval: z.string(),
  previous_billing_date: z.string(),
  product_id: z.string(),
  quantity: z.number(),
  recurring_pre_tax_amount: z.number(),
  status: z.string(),
  subscription_id: z.string(),
  subscription_period_count: z.number(),
  subscription_period_interval: z.string(),
  tax_inclusive: z.boolean(),
  trial_period_days: z.number(),
});

export const subscriptionListItemSchema = z.object({
  billing: z.object({
    city: z.string(),
    country: z.string(),
    state: z.string(),
    street: z.string(),
    zipcode: z.string(),
  }),
  cancel_at_next_billing_date: z.boolean(),
  cancelled_at: z.string(),
  created_at: z.string(),
  currency: z.string(),
  customer: z.object({
    customer_id: z.string(),
    email: z.string(),
    name: z.string(),
  }),
  discount_id: z.string(),
  metadata: z.object({}),
  next_billing_date: z.string(),
  on_demand: z.boolean(),
  payment_frequency_count: z.number(),
  payment_frequency_interval: z.string(),
  previous_billing_date: z.string(),
  product_id: z.string(),
  quantity: z.number(),
  recurring_pre_tax_amount: z.number(),
  status: z.string(),
  subscription_id: z.string(),
  subscription_period_count: z.number(),
  subscription_period_interval: z.string(),
  tax_inclusive: z.boolean(),
  trial_period_days: z.number(),
});

export const subscriptionListResponseSchema = z.object({
  items: z.array(subscriptionListItemSchema),
});

export interface SubscriptionListResponse {
  items: SubscriptionListItem[];
}

export interface SubscriptionListItem {
  billing: Billing;
  cancel_at_next_billing_date: boolean;
  cancelled_at: string;
  created_at: string;
  currency: string;
  customer: Customer;
  discount_id: string;
  metadata: Metadata;
  next_billing_date: string;
  on_demand: boolean;
  payment_frequency_count: number;
  payment_frequency_interval: string;
  previous_billing_date: string;
  product_id: string;
  quantity: number;
  recurring_pre_tax_amount: number;
  status: string;
  subscription_id: string;
  subscription_period_count: number;
  subscription_period_interval: string;
  tax_inclusive: boolean;
  trial_period_days: number;
}

export interface Billing {
  city: string;
  country: string;
  state: string;
  street: string;
  zipcode: string;
}

export interface PaymentListResponse {
  items: PaymentListDetails[];
}

export interface PaymentListDetails {
  brand_id: string;
  created_at: string;
  currency: string;
  customer: Customer;
  digital_products_delivered: boolean;
  metadata: Metadata;
  payment_id: string;
  payment_method: string;
  payment_method_type: string;
  status: any;
  subscription_id: string;
  total_amount: number;
}

export const paymentListDetailsSchema = z.object({
  brand_id: z.string(),
  created_at: z.string(),
  currency: z.string(),
  customer: CustomerSchema,
  digital_products_delivered: z.boolean(),
  metadata: MetadataSchema,
  payment_id: z.string(),
  payment_method: z.string(),
  payment_method_type: z.string(),
  status: z.any(),
  subscription_id: z.string(),
  total_amount: z.number(),
});

export const paymentListResponseSchema = z.object({
  items: z.array(paymentListDetailsSchema),
});
