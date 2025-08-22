import factory from "@/lib/factory";
import { dodoPaymentClient } from "@/lib/auth";
import { HttpStatus } from "@/lib/errors";
import { zValidator } from "@hono/zod-validator";
import {
  createNewCustomerSchema,
  customerDetailsSchema,
  errorResponseSchema,
} from "@repo/types";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { HTTPException } from "hono/http-exception";

export const createNewCustomerOnDodopayments = factory.createHandlers(
  describeRoute({
    tags: ["customers"],
    responses: {
      [HttpStatus.HTTP_201_CREATED]: {
        description: "New customer created successfully",
        content: {
          "application/json": {
            schema: resolver(customerDetailsSchema),
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
  validator("json", createNewCustomerSchema),
  zValidator("json", createNewCustomerSchema),
  async (c) => {
    try {
      const input = c.req.valid("json");

      const customerData = await dodoPaymentClient.customers.create({
        name: input.name,
        email: input.email,
        phone_number: input.phone_number,
      });

      return c.json(customerData, {
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
