import { Hono } from "hono";
import { handleSyncDodoCustomer } from "./handler/sync";
import { enforceUserOrAdminAuth } from "@/middleware/user-or-admin";

const syncDodoCustomer = new Hono().post(
  "/",
  enforceUserOrAdminAuth,
  ...handleSyncDodoCustomer,
);

export default syncDodoCustomer;
