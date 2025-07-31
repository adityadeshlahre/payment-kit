import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import { zValidator } from "@hono/zod-validator";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { dodoPayment } from "@repo/types";

export const createPaymentHandler = factory.createHandlers(
  zValidator("json", dodoPayment),
  async (c: Context) => {
    try {
      return c.json(
        {
          id: "payment123",
          status: "created",
          amount: 100,
          currency: "USD",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          metadata: {},
        },
        {
          status: HttpStatus.HTTP_201_CREATED,
        },
      );
    } catch (error) {
      console.error("Error creating payment:", error);
      throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
        message:
          error instanceof Error ? error.message : "Failed to create payment",
      });
    }
  },
);
