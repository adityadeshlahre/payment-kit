import { Hono } from "hono";
import { webhookSend } from "./handler/send";

const webhook = new Hono().post("/", ...webhookSend);

export default webhook;
