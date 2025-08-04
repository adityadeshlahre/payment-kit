import { Hono } from "hono";
import {
  getInvoiceWithPaymentIdHandler,
  getOneTimePaymentWithIdHandler,
} from "./handler/get";
import { createOneTimePaymentHandler } from "./handler/create";

const payment = new Hono()
  .get("/:id", ...getOneTimePaymentWithIdHandler)
  .get("/invoice/:id", ...getInvoiceWithPaymentIdHandler)
  .post("/", ...createOneTimePaymentHandler);

export default payment;
