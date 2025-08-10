import { auth } from "@/lib/auth";
import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import { HTTPException } from "hono/http-exception";

export const enforceUserOrAdminAuth = factory.createMiddleware(
  async (c, next) => {
    try {
      const session = await auth.api.getSession({
        headers: c.req.raw.headers,
      });
      if (!session?.user) {
        throw new HTTPException(HttpStatus.HTTP_401_UNAUTHORIZED, {
          message: "Unauthorized access",
        });
      }
      // @ts-ignore - temporary fix for Hono context typing
      c.set("user", session.user);
      await next();
    } catch (error) {
      console.error("Authentication error:", error);
      throw new HTTPException(HttpStatus.HTTP_401_UNAUTHORIZED, {
        message: "Invalid or expired authentication token",
      });
    }
  },
);
