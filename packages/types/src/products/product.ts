import { z } from "zod";
import type { Currency, TaxCategory } from "dodopayments/resources/misc";

const productId = z.string().min(1, "Product ID must be a non-empty string");

export const productIdSchema = z.object({
  id: productId,
});

export const productFileNameSchema = z.object({
  file_name: z.string().min(1, "File name must be a non-empty string"),
});

export const productFileNameUpdateResponseSchema = z.object({
  file_id: z.string(),
  url: z.string(),
});

export const type = z.enum(["one_time_price"]);

const price = z.object({
  currency: z.custom<Currency>().meta({
    type: "string",
    example: "USD",
  }),
  discount: z
    .number()
    .min(0, "Discount must be a non-negative number")
    .default(0),
  price: z.number().min(0, "Price must be a positive number"),
  purchasing_power_parity: z.boolean().default(false),
  type: z.literal("one_time_price"),
});

export const createProductSchema = z.object({
  price: price,
  tax_category: z
    .custom<TaxCategory>()
    .meta({ type: "string", example: "digital_product" }),
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

export interface productListResponse {
  items: productDetails[];
}

export const productDetailsSchema = z.object({
  business_id: z.string(),
  created_at: z.string(),
  currency: z.custom<Currency>().meta({
    type: "string",
    example: "USD",
  }),
  description: z.string(),
  image: z.string(),
  is_recurring: z.boolean(),
  name: z.string(),
  price: z.number(),
  price_detail: z.any(),
  product_id: z.string(),
  tax_category: z.custom<TaxCategory>().meta({
    type: "string",
    example: "digital_product",
  }),
  tax_inclusive: z.boolean(),
  updated_at: z.string(),
});

export const productListResponseSchema = z.object({
  items: z.array(productDetailsSchema),
});

export interface productDetails {
  business_id: string;
  created_at: string;
  currency: any;
  description: string;
  image: string;
  is_recurring: boolean;
  name: string;
  price: number;
  price_detail: any;
  product_id: string;
  tax_category: string;
  tax_inclusive: boolean;
  updated_at: string;
}
