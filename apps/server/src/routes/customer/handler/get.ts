import { dodoPaymentClient } from "@/lib/auth";
import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export const getCustomerListUsingDodoPaymentClientHandler =
  factory.createHandlers(async (c: Context) => {
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
  });
