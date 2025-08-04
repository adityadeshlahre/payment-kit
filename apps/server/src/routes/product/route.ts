import { Hono } from "hono";
import { getProductListUsingDodoPaymentClientHandler } from "./handler/list";
import { getProductDetailsWithIdHandler } from "./handler/get";
import { createProductHandler } from "./handler/create";
import { updateProductUsingProductIdHandler } from "./handler/update";

const product = new Hono()
  .get("/", ...getProductListUsingDodoPaymentClientHandler)
  .get("/:id", ...getProductDetailsWithIdHandler)
  .post("/", ...createProductHandler)
  .patch("/:id", ...updateProductUsingProductIdHandler);

export default product;
