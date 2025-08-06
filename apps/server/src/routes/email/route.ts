import { Hono } from "hono";
import { sendVerifyEmailResendEmailSendHandler } from "./handler/create";

const email = new Hono().get(
  "/verify-email",
  ...sendVerifyEmailResendEmailSendHandler,
);
