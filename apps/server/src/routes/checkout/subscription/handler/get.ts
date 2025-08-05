import { dodoPaymentClient } from "@/lib/auth";
import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import { zValidator } from "@hono/zod-validator";
import { paymentIdDetailsSchema } from "@repo/types";
import type { Context } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { HTTPException } from "hono/http-exception";

export const subscriptionDodoPaymentHandler = factory.createHandlers(
  describeRoute({
    tags: ["supscription payments"],
    responses: {
      [HttpStatus.HTTP_200_OK]: {
        description: "Subscription retrieved successfully",
        content: {
          "application/json": {
            schema: resolver(paymentIdDetailsSchema),
          },
        },
      },

      [HttpStatus.HTTP_400_BAD_REQUEST]: {
        description: "Bad request, missing subscription ID",
        content: {
          "application/json": {
            schema: resolver(paymentIdDetailsSchema),
          },
        },
      },

      [HttpStatus.HTTP_404_NOT_FOUND]: {
        description: "Subscription not found",
        content: {
          "application/json": {
            schema: resolver(paymentIdDetailsSchema),
          },
        },
      },

      [HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR]: {
        description: "Internal server error",
        content: {
          "application/json": {
            schema: resolver(paymentIdDetailsSchema),
          },
        },
      },
    },
  }),
  validator("param", paymentIdDetailsSchema),
  zValidator("param", paymentIdDetailsSchema),
  async (c: Context) => {
    const { id: subscriptionId } = c.req.param();
    if (!subscriptionId) {
      return c.json({ error: "Product ID is required" }, 400);
    }
    try {
      const response =
        await dodoPaymentClient.subscriptions.retrieve(subscriptionId);
      return c.json(response);
    } catch (error) {
      console.error("Error retrieving products:", error);
      throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
        message:
          error instanceof Error
            ? error.message
            : "Failed to retrieve products",
      });
    }
  },
);
