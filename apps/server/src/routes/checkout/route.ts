import { Hono } from "hono";
import { oneTimeDodoPaymentHandler } from "./onetime/handler/get";

const checkout = new Hono()
  .get("/one-time-payment/:id", ...oneTimeDodoPaymentHandler)
  .get("/subscription/:id", ...oneTimeDodoPaymentHandler);

export default checkout;
