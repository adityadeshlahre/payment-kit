import { z } from "zod";
import type { Currency, TaxCategory } from "dodopayments/resources/misc";
import { Addon } from "../payments/create-one-time-payment-schema";

export const type = z.enum(["one_time_price"]);

const price = z.object({
  currency: z.custom<Currency>(),
  discount: z
    .number()
    .min(0, "Discount must be a non-negative number")
    .default(0),
  price: z.number().min(0, "Price must be a positive number"),
  purchasing_power_parity: z.boolean().default(false),
  type: "one_time_price",
});

export const createProductSchema = z.object({
  price: price,
  tax_category: z.custom<TaxCategory>(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export interface CreateProductResponse {
  addons: string[];
  brand_id: string;
  business_id: string;
  created_at: string;
  description: string;
  digital_product_delivery: any;
  image: string;
  is_recurring: boolean;
  license_key_activation_message: string;
  license_key_activations_limit: number;
  license_key_duration: any;
  license_key_enabled: boolean;
  name: string;
  price: Price;
  product_id: string;
  tax_category: string;
  updated_at: string;
}

export interface Price {
  currency: string;
  discount: number;
  pay_what_you_want: boolean;
  price: number;
  purchasing_power_parity: boolean;
  suggested_price: number;
  tax_inclusive: boolean;
  type: string;
}
