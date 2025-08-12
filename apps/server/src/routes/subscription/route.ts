import { Hono } from "hono";
import { getSubscriptionWithIdHandler } from "./handler/get";
import { createSubscriptionPaymentHandler } from "./handler/create";
import {
  changePlanSubscriptionWithSubscriptionIdHandler,
  patchSubscriptionWithSubscriptionIdHandler,
} from "./handler/update";
import { getSubscriptionListHandler } from "./handler/list";
import { enforceUserOrAdminAuth } from "@/middleware/user-or-admin";

const subscription = new Hono()
  .get("/", enforceUserOrAdminAuth, ...getSubscriptionListHandler)
  .get("/:id", enforceUserOrAdminAuth, ...getSubscriptionWithIdHandler)
  .post("/", enforceUserOrAdminAuth, ...createSubscriptionPaymentHandler)
  .post("/:id/change-plan", enforceUserOrAdminAuth, ...changePlanSubscriptionWithSubscriptionIdHandler)
  .patch("/:id", enforceUserOrAdminAuth, ...patchSubscriptionWithSubscriptionIdHandler);

export default subscription;
