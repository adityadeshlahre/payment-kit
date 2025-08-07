import { Hono } from "hono";
import { sendEmailHandler } from "./handler/create";

const email = new Hono().post(
  "/send",
  ...sendEmailHandler,
);

export default email;
