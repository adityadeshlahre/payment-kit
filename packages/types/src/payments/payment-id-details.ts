import { z } from "zod";
import {
  Customer,
  Metadata,
  ProductCart,
} from "./create-one-time-payment-schema";

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
