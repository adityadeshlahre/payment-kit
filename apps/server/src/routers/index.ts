import payment from "@/routes/payment/route";
import { Hono } from "hono";

const api = new Hono().route("/payment", payment);

export const appRouter = api;
export type AppRouter = typeof appRouter;
