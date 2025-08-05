import { dodoPaymentClient } from "@/lib/auth";
import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import { customerListResponseSchema } from "@repo/types";
import type { Context } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { HTTPException } from "hono/http-exception";

export const getCustomerListUsingDodoPaymentClientHandler =
  factory.createHandlers(
    describeRoute({
      tags: ["customers"],
      description: "Retrieve a list of customers",
      responses: {
        [HttpStatus.HTTP_200_OK]: {
          description: "Customers retrieved successfully",
          content: {
            "application/json": {
              schema: resolver(customerListResponseSchema),
            },
          },
        },
        [HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR]: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: resolver(customerListResponseSchema),
            },
          },
        },
      },
    }),
    async (c: Context) => {
      try {
        const customersData = await dodoPaymentClient.customers.list();
        return c.json(customersData, HttpStatus.HTTP_200_OK);
      } catch (error) {
        console.error("Error retrieving customers:", error);
        throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
          message:
            error instanceof Error
              ? error.message
              : "Failed to retrieve customers",
        });
      }
    },
  );
