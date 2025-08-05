import { Hono } from "hono";
import { getProductListUsingDodoPaymentClientHandler } from "./handler/list";
import { getProductDetailsWithIdHandler } from "./handler/get";
import { createProductHandler } from "./handler/create";
import {
  updateProductFilesUsingProductIdHandler,
  updateProductImageUsingProductIdHandler,
  updateProductUsingProductIdHandler,
} from "./handler/update";
import { deleteProductUsingProductIdHandler } from "./handler/delete";
import { unarchiveProductUsingProductIdHandler } from "./handler/unarchive";

const product = new Hono()
  .get("/", ...getProductListUsingDodoPaymentClientHandler)
  .get("/:id", ...getProductDetailsWithIdHandler)
  .post("/", ...createProductHandler)
  .post("/:id", ...unarchiveProductUsingProductIdHandler)
  .put("/images/:id", ...updateProductImageUsingProductIdHandler)
  .put("/files/:id", ...updateProductFilesUsingProductIdHandler)
  .patch("/:id", ...updateProductUsingProductIdHandler)
  .delete("/:id", ...deleteProductUsingProductIdHandler);

export default product;
