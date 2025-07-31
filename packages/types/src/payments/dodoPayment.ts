import { z } from "zod";

export const dodoPayment = z.object({
  paymentId: z.string().describe("Unique identifier for the payment"),
  amount: z.number().describe("Amount of the payment"),
  currency: z.string().describe("Currency of the payment"),
  status: z
    .enum(["pending", "completed", "failed"])
    .describe("Status of the payment"),
  createdAt: z.string().describe("Timestamp when the payment was created"),
  updatedAt: z.string().describe("Timestamp when the payment was last updated"),
  metadata: z
    .record(z.string(), z.any())
    .optional()
    .describe("Optional metadata associated with the payment"),
});
