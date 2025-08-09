import { Hono } from "hono";
import { oneTimeDodoPaymentHandler } from "./onetime/handler/get";
import { subscriptionDodoPaymentHandler } from "./subscription/handler/get";

const checkout = new Hono()
  .get("/onetime/:id", ...oneTimeDodoPaymentHandler)
  .get("/subscription/:id", ...subscriptionDodoPaymentHandler);

export default checkout;
