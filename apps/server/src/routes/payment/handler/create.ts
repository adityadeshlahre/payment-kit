import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import {
  dodoPaymentCreatePaymentSchema,
  type DodoPaymentCreatePaymentInput,
  type ProductCartItemInput,
} from "@repo/types/payments/create-one-time-payment-schema";
import { dodoPaymentClient } from "@/lib/auth";

export const createPaymentHandler = factory.createHandlers(
  zValidator("json", dodoPaymentCreatePaymentSchema),
  async (c) => {
    const input: DodoPaymentCreatePaymentInput = c.req.valid("json");
    try {
      const paymentData = await dodoPaymentClient.payments.create({
        billing: {
          city: input.billing.city,
          country: input.billing.country,
          state: input.billing.state,
          street: input.billing.street,
          zipcode: input.billing.zipcode,
        },
        customer: {
          customer_id: input.customer.customer_id,
        },
        product_cart: input.product_cart.map((item: ProductCartItemInput) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
      });

      return c.json(paymentData, {
        status: HttpStatus.HTTP_201_CREATED,
      });
    } catch (error) {
      console.error("Error creating payment:", error);
      throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
        message:
          error instanceof Error ? error.message : "Failed to create payment",
      });
    }
  },
);
