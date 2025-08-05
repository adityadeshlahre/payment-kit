import { dodoPaymentClient } from "@/lib/auth";
import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import type { Context } from "hono";
import { describeRoute } from "hono-openapi";
import { HTTPException } from "hono/http-exception";

export const changePlanSubscriptionWithSubscriptionIdHandler =
  factory.createHandlers(
    describeRoute({
      tags: ["subscription"],
      description: "Change the plan of a subscription by subscription ID",
      responses: {
        [HttpStatus.HTTP_200_OK]: {
          description: "Subscription plan changed successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    enum: ["success"],
                  },
                },
              },
            },
          },
        },
        [HttpStatus.HTTP_400_BAD_REQUEST]: {
          description:
            "Bad request, missing subscription ID or body parameters",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { type: "string" },
                },
              },
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
    async (c: Context) => {
      const { id: subscriptionId } = c.req.param();
      if (!subscriptionId) {
        return c.json(
          { error: "Subscription ID is required" },
          { status: HttpStatus.HTTP_400_BAD_REQUEST },
        );
      }
      try {
        const body = await c.req.json();
        await dodoPaymentClient.subscriptions.changePlan(subscriptionId, {
          product_id: body.product_id,
          proration_billing_mode: body.proration_billing_mode,
          quantity: body.quantity,
        });
        return c.json({
          status: HttpStatus.HTTP_200_OK,
        });
      } catch (error) {
        console.error("Error changing plan subscription:", error);
        throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
          message:
            error instanceof Error
              ? error.message
              : "Failed to change plan subscription",
        });
      }
    },
  );

export const patchSubscriptionWithSubscriptionIdHandler =
  factory.createHandlers(async (c: Context) => {
    const { id: subscriptionId } = c.req.param();
    if (!subscriptionId) {
      return c.json(
        { error: "Subscription ID is required" },
        { status: HttpStatus.HTTP_400_BAD_REQUEST },
      );
    }
    try {
      const body = await c.req.json();
      const response = await dodoPaymentClient.subscriptions.update(
        subscriptionId,
        body,
      );
      return c.json(response);
    } catch (error) {
      console.error("Error updating subscription:", error);
      throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
        message:
          error instanceof Error
            ? error.message
            : "Failed to update subscription",
      });
    }
  });
