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
    description: "Retrieve a subscription by ID",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "The ID of the payment to retrieve",
        required: true,
        schema: {
          type: "string",
          pattern: "^[a-zA-Z0-9_-]+$",
        },
      },
      {
        name: "quantity",
        in: "query",
        description: "The quantity of the product to purchase",
        required: true,
        schema: {
          type: "integer",
          minimum: 1,
          maximum: 100,
        },
      },
      {
        name: "redirect_url",
        in: "query",
        description: "The URL to redirect to after payment",
        required: true,
        schema: {
          type: "string",
          format: "uri",
        },
      },
    ],
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
      return c.json(
        { error: "Subscription ID is required" },
        { status: HttpStatus.HTTP_400_BAD_REQUEST },
      );
    }

    const redirect_url = c.req.query("redirect_url");
    if (!redirect_url) {
      return c.json(
        { error: "Redirect URL is required" },
        { status: HttpStatus.HTTP_400_BAD_REQUEST },
      );
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
