import "dotenv/config";
import { auth } from "./lib/auth";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { appRouter } from "./routers";
import { openAPISpecs } from "hono-openapi";
import { Scalar } from "@scalar/hono-api-reference";

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
app.get(
  "/openapi",
  openAPISpecs(app, {
    documentation: {
      info: {
        title: "Payment Kit API",
        description: "Payment Kit API documentation",
        version: "1.0.0",
      },
      servers: [
        {
          url: process.env.API_URL || "http://localhost:3000",
          description: "Development server",
        },
      ],
    },
  }),
);
app.get(
  "/docs",
  Scalar({
    theme: "deepSpace",
    url: "/openapi",
  }),
);

app.all("/api/auth/*", (c) => auth.handler(c.req.raw));

app.use("/api/*", async (c, next) => {
  const authHeader = c.req.header("Authorization");
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
