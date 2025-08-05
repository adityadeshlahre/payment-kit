import { dodoPaymentClient } from "@/lib/auth";
import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import { zValidator } from "@hono/zod-validator";
import {
  customerIdDetailsResponseSchema,
  customerIdDetailsSchema,
  errorResponseSchema,
} from "@repo/types";
import type { Context } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { HTTPException } from "hono/http-exception";

export const getCustomerDetailsWithIdHandler = factory.createHandlers(
  describeRoute({
    tags: ["customers"],
    responses: {
      [HttpStatus.HTTP_200_OK]: {
        description: "Customer details retrieved successfully",
        content: {
          "application/json": {
            schema: resolver(customerIdDetailsResponseSchema),
          },
        },
      },
      [HttpStatus.HTTP_400_BAD_REQUEST]: {
        description: "Bad request, missing customer ID",
        content: {
          "application/json": {
            schema: resolver(errorResponseSchema),
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
  validator("param", customerIdDetailsSchema),
  zValidator("param", customerIdDetailsSchema),
  async (c: Context) => {
    const { id: customerId } = c.req.param();
    if (!customerId) {
      return c.json({ error: "Customer ID is required" }, 400);
    }
    try {
      const response = await dodoPaymentClient.customers.retrieve(customerId);
      return c.json(response);
    } catch (error) {
      console.error("Error retrieving customer details:", error);
      throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
        message:
          error instanceof Error
            ? error.message
            : "Failed to retrieve customer details",
      });
    }
  },
);
