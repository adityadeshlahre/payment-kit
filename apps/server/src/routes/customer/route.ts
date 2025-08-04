import { Hono } from "hono";
import { getCustomerListUsingDodoPaymentClientHandler } from "./handler/list";
import { getCustomerDetailsWithIdHandler } from "./handler/get";
import { patchCustomerDetailsWithIdHandler } from "./handler/patch";

const customer = new Hono()
  .get("/", ...getCustomerListUsingDodoPaymentClientHandler)
  .get("/:id", ...getCustomerDetailsWithIdHandler)
  .patch("/:id", ...patchCustomerDetailsWithIdHandler);

export default customer;
