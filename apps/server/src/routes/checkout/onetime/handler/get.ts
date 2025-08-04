import { dodoPaymentClient } from "@/lib/auth";
import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export const oneTimeDodoPaymentHandler = factory.createHandlers(
  async (c: Context) => {
    const { id: paymentId } = c.req.param();
    if (!paymentId) {
      return c.json({ error: "Product ID is required" }, 400);
    }
    try {
      const response = await dodoPaymentClient.payments.retrieve(paymentId);
      if (!response) {
        return c.json(
          { error: "Payment not found" },
          { status: HttpStatus.HTTP_404_NOT_FOUND },
        );
      }
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
