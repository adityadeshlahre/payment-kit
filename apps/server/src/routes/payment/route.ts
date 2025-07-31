import { Hono } from "hono";
import { getPaymentWithIdHandler } from "./handler/get";
import { createPaymentHandler } from "./handler/create";

const payment = new Hono()
  .get("/:id", ...getPaymentWithIdHandler)
  .post("/", ...createPaymentHandler);

export default payment;
