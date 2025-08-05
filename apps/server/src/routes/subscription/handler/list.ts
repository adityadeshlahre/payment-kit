import { dodoPaymentClient } from "@/lib/auth";
import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import {
  errorResponseSchema,
  subscriptionListResponseSchema,
} from "@repo/types";
import type { Context } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { HTTPException } from "hono/http-exception";

export const getSubscriptionListHandler = factory.createHandlers(
  describeRoute({
    tags: ["subscription"],
    responses: {
      [HttpStatus.HTTP_200_OK]: {
        description: "Subscriptions retrieved successfully",
        content: {
          "application/json": {
            schema: resolver(subscriptionListResponseSchema),
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
  async (c: Context) => {
    try {
      const subscriptionsList = await dodoPaymentClient.subscriptions.list();
      return c.json(subscriptionsList, { status: HttpStatus.HTTP_200_OK });
    } catch (error) {
      console.error("Error retrieving subscriptions:", error);
      throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
        message:
          error instanceof Error
            ? error.message
            : "Failed to retrieve subscriptions",
      });
    }
  },
);
