import { Hono } from "hono";
import { getCustomerListUsingDodoPaymentClientHandler } from "./handler/list";
import { getCustomerDetailsWithIdHandler } from "./handler/get";
import { patchCustomerDetailsWithIdHandler } from "./handler/patch";
import { enforceUserOrAdminAuth } from "@/middleware/user-or-admin";

const customer = new Hono()
  .get("/", enforceUserOrAdminAuth, ...getCustomerListUsingDodoPaymentClientHandler)
  .get("/:id", enforceUserOrAdminAuth, ...getCustomerDetailsWithIdHandler)
  .patch("/:id", enforceUserOrAdminAuth, ...patchCustomerDetailsWithIdHandler);

export default customer;
