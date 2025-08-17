import { Hono } from "hono";
import { getCustomerListUsingDodoPaymentClientHandler } from "./handler/list";
import { getCustomerDetailsWithIdHandler } from "./handler/get";
import { patchCustomerDetailsWithIdHandler } from "./handler/patch";
import { enforceUserOrAdminAuth } from "@/middleware/user-or-admin";
import { createNewCustomerOnDodopayments } from "./handler/create";

const customer = new Hono()
  .get("/", enforceUserOrAdminAuth, ...getCustomerListUsingDodoPaymentClientHandler)
  .get("/:id", enforceUserOrAdminAuth, ...getCustomerDetailsWithIdHandler)
  .post("/", enforceUserOrAdminAuth, ...createNewCustomerOnDodopayments)
  .patch("/:id", enforceUserOrAdminAuth, ...patchCustomerDetailsWithIdHandler);

export default customer;
