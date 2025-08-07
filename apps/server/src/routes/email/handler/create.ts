import { baseErrorSchema, HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import { resend } from "@/lib/resend";
import { zValidator } from "@hono/zod-validator";
import {
  emailResponseSchema,
  emailSchema,
  errorResponseSchema,
} from "@repo/types";
import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { HTTPException } from "hono/http-exception";
import {
  VerifyEmailTemplate,
  ResetPasswordTemplate,
  GenericEmailTemplate,
} from "./../templates/template";

export const sendEmailHandler = factory.createHandlers(
  describeRoute({
    tags: ["email"],
    description:
      "Send emails using different templates (verify, reset, etc.) via Resend",
    responses: {
      [HttpStatus.HTTP_200_OK]: {
        description: "Email sent successfully",
        content: {
          "application/json": {
            schema: resolver(emailResponseSchema),
          },
        },
      },
      [HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR]: {
        description: "Internal server error",
        content: {
          "application/json": {
            schema: resolver(errorResponseSchema),
          },
        },
      },
    },
  }),
  validator("json", emailSchema),
  zValidator("json", emailSchema),
  async (c) => {
    try {
      const { email, subject, fromName, fromMail, typeOfEMail, url } =
        c.req.valid("json");

      const userEmail = Array.isArray(email) ? email[0] : email;

      const templateProps = { fromMail, fromName, url: url ?? "", userEmail };

      const { data: response, error } = await resend.emails.send({
        from: `${fromName} <${fromMail}>`,
        to: email,
        subject: `${subject}`,
        react:
          typeOfEMail === "verify"
            ? VerifyEmailTemplate(templateProps)
            : typeOfEMail === "reset"
              ? ResetPasswordTemplate(templateProps)
              : GenericEmailTemplate(templateProps),
      });

      if (error) {
        throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
          message: error.message || "Failed to send email",
        });
      }

      return c.json(response, { status: HttpStatus.HTTP_200_OK });
    } catch (error) {
      console.error("Error sending email:", error);
      throw new HTTPException(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR, {
        message:
          error instanceof Error ? error.message : "Failed to send email",
      });
    }
  },
);
