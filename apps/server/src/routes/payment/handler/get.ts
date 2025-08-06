import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import { HTTPException } from "hono/http-exception";
import type { Context } from "hono";
import { dodoPaymentClient } from "@/lib/auth";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import {
  errorResponseSchema,
  paymentIdDetailsSchema,
  paymentListResponseSchema,
} from "@repo/types";
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

      [HttpStatus.HTTP_400_BAD_REQUEST]: {
        description: "Bad request, missing payment ID",
        content: {
          "application/json": {
            schema: resolver(errorResponseSchema),
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
  validator("param", paymentIdDetailsSchema),
  zValidator("param", paymentIdDetailsSchema),
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

export const getPaymentListHandler = factory.createHandlers(
  describeRoute({
    tags: ["payments"],
    responses: {
      [HttpStatus.HTTP_200_OK]: {
        description: "List of payments retrieved successfully",
        content: {
          "application/json": {
            schema: resolver(paymentListResponseSchema),
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
  async (c: Context) => {
    try {
      const payments = await dodoPaymentClient.payments.list();
      return c.json(payments, { status: HttpStatus.HTTP_200_OK });
    } catch (error) {
      console.error("Error retrieving payment list:", error);
      throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
        message:
          error instanceof Error
            ? error.message
            : "Failed to retrieve payment list",
      });
    }
  },
);
