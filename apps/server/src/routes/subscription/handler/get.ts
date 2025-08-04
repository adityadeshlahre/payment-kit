import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import { HTTPException } from "hono/http-exception";
import type { Context } from "hono";
import { dodoPaymentClient } from "@/lib/auth";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { errorResponseSchema, paymentIdDetailsSchema } from "@repo/types";
import { zValidator } from "@hono/zod-validator";

export const getSubscriptionWithIdHandler = factory.createHandlers(
  describeRoute({
    tags: ["payments"],
    responses: {
      [HttpStatus.HTTP_200_OK]: {
        description: "Subscription retrieved successfully",
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
            schema: resolver(errorResponseSchema),
          },
        },
      },
    },
  }),
  validator("json", paymentIdDetailsSchema),
  zValidator("json", paymentIdDetailsSchema),
  async (c: Context) => {
    const { id: subscriptionId } = c.req.param();
    if (!subscriptionId) {
      return c.json({ error: "Product ID is required" }, 400);
    }
    try {
      const response =
        await dodoPaymentClient.subscriptions.retrieve(subscriptionId);
      return c.json(response, { status: HttpStatus.HTTP_200_OK });
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
