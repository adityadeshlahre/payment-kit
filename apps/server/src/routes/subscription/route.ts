import { Hono } from "hono";
import { getSubscriptionWithIdHandler } from "./handler/get";
import { createSubscriptionPaymentHandler } from "./handler/create";
import {
  changePlanSubscriptionWithSubscriptionIdHandler,
  patchSubscriptionWithSubscriptionIdHandler,
} from "./handler/update";
import { getSubscriptionListHandler } from "./handler/list";

const subscription = new Hono()
  .get("/", ...getSubscriptionListHandler)
  .get("/:id", ...getSubscriptionWithIdHandler)
  .post("/", ...createSubscriptionPaymentHandler)
  .post("/:id/change-plan", ...changePlanSubscriptionWithSubscriptionIdHandler)
  .patch("/:id", ...patchSubscriptionWithSubscriptionIdHandler);

export default subscription;
