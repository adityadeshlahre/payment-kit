import checkout from "@/routes/checkout/route";
import customer from "@/routes/customer/route";
import email from "@/routes/email/route";
import payment from "@/routes/payment/route";
import product from "@/routes/product/route";
import subscription from "@/routes/subscription/route";
import webhook from "@/routes/webhook/route";
import syncDodoCustomer from "@/routes/sync-dodo-customer/route";
import { Hono } from "hono";

const api = new Hono()
  .route("/payment", payment)
  .route("/subscription", subscription)
  .route("/checkout", checkout)
  .route("/product", product)
  .route("/customer", customer)
  .route("/email", email)
  .route("/webhook", webhook)
  .route("/sync-dodo-customer", syncDodoCustomer);

export const appRouter = api;
export type AppRouter = typeof appRouter;
