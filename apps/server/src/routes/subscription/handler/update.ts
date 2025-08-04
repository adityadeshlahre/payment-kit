import { dodoPaymentClient } from "@/lib/auth";
import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export const changePlanSubscriptionWithSubscriptionIdHandler =
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
      const response = await dodoPaymentClient.subscriptions.changePlan(
        subscriptionId,
        {
          product_id: body.product_id,
          proration_billing_mode: body.proration_billing_mode,
          quantity: body.quantity,
        },
      );
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
  });

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
