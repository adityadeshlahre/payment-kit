import { IntentStatus } from "dodopayments/resources/payments";
import z from "zod";

export const VALID_STATUSES: IntentStatus[] = [
  "succeeded",
  "failed",
  "cancelled",
  "processing",
  "requires_customer_action",
  "requires_merchant_action",
  "requires_payment_method",
  "requires_confirmation",
  "requires_capture",
  "partially_captured",
  "partially_captured_and_capturable",
];
