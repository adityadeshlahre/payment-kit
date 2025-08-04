import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import {
  dodoPaymentCreatePaymentSchema,
  dodoPaymentSubscriptionCreatePaymentSchema,
  errorResponseSchema,
  type DodoPaymentCreatePaymentInput,
  type DodoPaymentSubscriptionCreatePaymentInput,
  type ProductCartItemInput,
} from "@repo/types";
import { dodoPaymentClient } from "@/lib/auth";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import type { CountryCode } from "dodopayments/resources/misc";

export const createSubscriptionPaymentHandler = factory.createHandlers(
  describeRoute({
    tags: ["payments"],
    requestBody: {
      content: {
        "application/json": {
          schema: dodoPaymentCreatePaymentSchema,
        },
      },
    },
    responses: {
      [HttpStatus.HTTP_201_CREATED]: {
        description: "Subscription payment created successfully",
        content: {
          "application/json": {
            schema: resolver(dodoPaymentCreatePaymentSchema),
          },
        },
      },

      [HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR]: {
        description: "Internal server error",
        content: {
          "application/json": {
            schema: resolver(errorResponseSchema),
          },
        },
      },
    },
  }),
  validator("json", dodoPaymentSubscriptionCreatePaymentSchema),
  zValidator("json", dodoPaymentSubscriptionCreatePaymentSchema),
  async (c) => {
    const input: DodoPaymentSubscriptionCreatePaymentInput =
      c.req.valid("json");
    try {
      const paymentData = await dodoPaymentClient.subscriptions.create({
        billing: {
          city: input.billing.city,
          country: input.billing.country as CountryCode,
          state: input.billing.state,
          street: input.billing.street,
          zipcode: input.billing.zipcode,
        },
        customer: {
          customer_id: input.customer.customer_id,
        },
        product_id: input.product_id,
        quantity: input.quantity,
      });

      return c.json(paymentData, {
        status: HttpStatus.HTTP_201_CREATED,
      });
    } catch (error) {
      console.error("Error creating subscription payment:", error);
      throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
        message:
          error instanceof Error
            ? error.message
            : "Failed to create subscription payment",
      });
    }
  },
);
