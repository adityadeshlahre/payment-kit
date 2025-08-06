import { z } from "zod";

export const emailSchema = {
	email: z.union([
		z.string().email("Invalid email format").nonempty("Email is required"),
		z.array(z.string().email("Invalid email format")),
	]),
	fromName: z.string(),
	fromMail: z
		.string()
		.email("Invalid from email format")
		.nonempty("From email is required"),
	subject: z.string().nonempty("Subject is required"),
	typeOfEMail: z.enum(["verify", "reset", "other"]).optional(),
};

export const emailResponseSchema = z.object({
	data: z.any(),
	status: z.object({
		message: z.string(),
	}),
});
