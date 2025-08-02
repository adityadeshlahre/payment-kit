import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import { HTTPException } from "hono/http-exception";
import type { Context } from "hono";
import { dodoPaymentClient } from "@/lib/auth";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { paymentIdDetailsSchema } from "@repo/types";

export const getPaymentWithIdHandler = factory.createHandlers(
  describeRoute({
    tags: ["payments"],
    responses: {
      [HttpStatus.HTTP_201_CREATED]: {
        description: "Payment created successfully",
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
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
          },
        },
      },
    },
  }),
  validator("json", paymentIdDetailsSchema),
  async (c: Context) => {
    const { id } = c.req.param();
    if (!id) {
      return c.json({ error: "Payment ID is required" }, 400);
    }
    try {
      const paymentData = dodoPaymentClient.payments.retrieve(id);
      return c.json(paymentData, { status: HttpStatus.HTTP_200_OK });
    } catch (error) {
      console.error("Error retrieving payment:", error);
      throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
        message:
          error instanceof Error ? error.message : "Failed to retrieve payment",
      });
    }
  },
);
