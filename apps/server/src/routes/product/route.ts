import { Hono } from "hono";
import { getProductListUsingDodoPaymentClientHandler } from "./handler/get";

const product = new Hono().get(
  "/",
  ...getProductListUsingDodoPaymentClientHandler,
);

export default product;
