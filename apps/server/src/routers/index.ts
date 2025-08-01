import checkout from "@/routes/checkout/route";
import payment from "@/routes/payment/route";
import product from "@/routes/product/route";
import webhook from "@/routes/webhook/route";
import { Hono } from "hono";

const api = new Hono()
  .route("/payment", payment)
  .route("/checkout", checkout)
  .route("/product", product)
  .route("/webhook", webhook);

export const appRouter = api;
export type AppRouter = typeof appRouter;
