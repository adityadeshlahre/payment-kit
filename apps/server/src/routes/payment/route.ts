import { Hono } from "hono";
import {
  getInvoiceWithPaymentIdHandler,
  getOneTimePaymentWithIdHandler,
  getPaymentListHandler,
} from "./handler/get";
import { createOneTimePaymentHandler } from "./handler/create";
import { enforceUserOrAdminAuth } from "@/middleware/user-or-admin";

const payment = new Hono()
  .get("/", enforceUserOrAdminAuth, ...getPaymentListHandler)
  .get("/:id", enforceUserOrAdminAuth, ...getOneTimePaymentWithIdHandler)
  .get("/invoice/:id", enforceUserOrAdminAuth, ...getInvoiceWithPaymentIdHandler)
  .post("/", enforceUserOrAdminAuth, ...createOneTimePaymentHandler);

export default payment;
