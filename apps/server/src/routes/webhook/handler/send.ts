import { dodoPaymentClient } from "@/lib/auth";
import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import { HTTPException } from "hono/http-exception";
import type { Context } from "hono";
import { Webhook } from "standardwebhooks";

const webhook = new Webhook(process.env.DODO_PAYMENTS_WEBHOOK_SECRET as string);

export const webhookSend = factory.createHandlers(async (c: Context) => {
  try {
    const rawBody = await c.req.text();
    const webhookHeaders = {
      "webhook-id": c.req.header("webhook-id") || "",
      "webhook-signature": c.req.header("webhook-signature") || "",
      "webhook-timestamp": c.req.header("webhook-timestamp") || "",
    };

    await webhook.verify(rawBody, webhookHeaders);
    const payload = JSON.parse(rawBody);

    if (payload.data.payload_type === "Subscription") {
      switch (payload.type) {
        case "subscription.active":
          const subscription = await dodoPaymentClient.subscriptions.retrieve(
            payload.data.subscription_id,
          );
          console.log("-------SUBSCRIPTION DATA START ---------");
          console.log(subscription);
          console.log("-------SUBSCRIPTION DATA END ---------");
          break;
        case "subscription.failed":
          break;
        case "subscription.cancelled":
          break;
        case "subscription.renewed":
          break;
        case "subscription.on_hold":
          break;
        default:
          break;
      }
    } else if (payload.data.payload_type === "Payment") {
      switch (payload.type) {
        case "payment.succeeded":
          const paymentDataResp = await dodoPaymentClient.payments.retrieve(
            payload.data.payment_id,
          );
          console.log("-------PAYMENT DATA START ---------");
          console.log(paymentDataResp);
          console.log("-------PAYMENT DATA END ---------");
          break;
        default:
          break;
      }
    }
    return c.json({ success: true, message: "Webhook processed successfully" });
  } catch (error) {
    console.log(" ----- webhoook verification failed -----");
    console.log(error);
    throw new HTTPException(HttpStatus.HTTP_400_BAD_REQUEST, {
      message:
        error instanceof Error ? error.message : "Webhook verification failed",
    });
  }
});
