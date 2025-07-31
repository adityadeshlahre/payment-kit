import "dotenv/config";
import { auth } from "./lib/auth";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { appRouter } from "./routers";

const app = new Hono();

app.use(logger());
app.use(
  "/*",
  cors({
    origin: process.env.CORS_ORIGIN || "",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.use("/api/*", async (c, next) => {
  const authHeader = c.req.header("authorization");
  if (authHeader) {
    try {
      const session = await auth.api.getSession({
        headers: c.req.raw.headers,
      });

      if (session?.user) {
        // @ts-ignore - temporary fix for Hono context typing
        c.set("user", session.user);
      }
    } catch (error) {
      console.error("Auth middleware error:", error);
    }
  }
  await next();
});

app.route("/api", appRouter);

app.get("/", (c) => {
  return c.text("OK");
});

export default app;
