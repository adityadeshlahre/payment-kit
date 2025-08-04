import { dodoPaymentClient } from "@/lib/auth";
import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export const getSubscriptionListHandler = factory.createHandlers(
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
