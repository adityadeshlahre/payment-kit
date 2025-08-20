import { z } from "zod";

export const emailSchema = z.object({
  email: z.union([
    z.string().email("Invalid email format").nonempty("Email is required"),
    z.array(z.string().email("Invalid email format")),
  ]),
  fromName: z.string().nonempty("From name is required"),
  fromMail: z
    .string()
    .email("Invalid from email format")
    .nonempty("From email is required"),
  subject: z.string().nonempty("Subject is required"),
  typeOfEMail: z.enum(["verify", "reset", "other"]).optional(),
  url: z.string().url("Invalid URL format").optional(),
});

export const emailResponseSchema = z.object({
  data: z.object({
    id: z.string(),
  }),
  status: z.object({
    message: z.string(),
  }),
});

export type emailSchemaType = z.infer<typeof emailSchema>;

export interface emailReponseInterface {
  data: {
    id: string;
  };
  status: {
    message: string;
  };
}

export type emailReponseType = z.infer<typeof emailResponseSchema>;
