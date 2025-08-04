import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import { HTTPException } from "hono/http-exception";
import type { Context } from "hono";
import { dodoPaymentClient } from "@/lib/auth";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { paymentIdDetailsSchema } from "@repo/types";
import { zValidator } from "@hono/zod-validator";

export const getOneTimePaymentWithIdHandler = factory.createHandlers(
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
  zValidator("json", paymentIdDetailsSchema),
  async (c: Context) => {
    const { id: paymentId } = c.req.param();
    if (!paymentId) {
      return c.json({ error: "Payment ID is required" }, 400);
    }
    try {
      const paymentData = dodoPaymentClient.payments.retrieve(paymentId);
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

export const getInvoiceWithPaymentIdHandler = factory.createHandlers(
  async (c: Context) => {
    const { id: paymentId } = c.req.param();
    if (!paymentId) {
      return c.json(
        { error: "Payment ID is required" },
        { status: HttpStatus.HTTP_400_BAD_REQUEST },
      );
    }
    try {
      const invoiceData =
        await dodoPaymentClient.invoices.payments.retrieve(paymentId);
      return c.json(invoiceData, { status: HttpStatus.HTTP_200_OK });
    } catch (error) {
      console.error("Error retrieving invoice:", error);
      throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
        message:
          error instanceof Error ? error.message : "Failed to retrieve invoice",
      });
    }
  },
);
