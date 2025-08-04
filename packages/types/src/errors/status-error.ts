import { z } from "zod";

export const errorResponseSchema = z.object({
  message: z.string(),
});
// .meta({ type: "object", example: { message: "Something went wrong" } });
