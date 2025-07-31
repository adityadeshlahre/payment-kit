import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import { HTTPException } from "hono/http-exception";
import type { Context } from "hono";

export const getPaymentWithIdHandler = factory.createHandlers(
  async (c: Context) => {
    const { id } = c.req.param();
    if (!id) {
      return c.json({ error: "Payment ID is required" }, 400);
    }
    try {
      const paymentData = { id, status: "completed" };
      return c.json(paymentData);
    } catch (error) {
      console.error("Error retrieving payment:", error);
      throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
        message:
          error instanceof Error ? error.message : "Failed to retrieve payment",
      });
    }
  },
);
