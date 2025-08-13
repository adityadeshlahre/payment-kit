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
import { enforceUserOrAdminAuth } from "@/middleware/user-or-admin";

const product = new Hono()
  .get("/", ...getProductListUsingDodoPaymentClientHandler)
  .get("/:id", ...getProductDetailsWithIdHandler)
  .post("/", enforceUserOrAdminAuth, ...createProductHandler)
  .post("/:id", enforceUserOrAdminAuth, ...unarchiveProductUsingProductIdHandler)
  .put("/images/:id", enforceUserOrAdminAuth, ...updateProductImageUsingProductIdHandler)
  .put("/files/:id", enforceUserOrAdminAuth, ...updateProductFilesUsingProductIdHandler)
  .patch("/:id", enforceUserOrAdminAuth, ...updateProductUsingProductIdHandler)
  .delete("/:id", enforceUserOrAdminAuth, ...deleteProductUsingProductIdHandler);

export default product;
