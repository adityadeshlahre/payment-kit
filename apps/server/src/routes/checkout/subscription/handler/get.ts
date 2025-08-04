import { dodoPaymentClient } from "@/lib/auth";
import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export const subscriptionDodoPaymentHandler = factory.createHandlers(
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
