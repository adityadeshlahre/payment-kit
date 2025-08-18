import { auth } from "@/lib/auth";
import { HttpStatus } from "@/lib/errors";
import factory from "@/lib/factory";
import type { loginViEmailReponse, userEnvForMiddlware } from "@repo/types";
import { HTTPException } from "hono/http-exception";

// declare module "hono" {
//   interface Context {
//     user: userEnvForMiddlware;
//   }
// }

type HonoEnv = {
  Variables: {
    user: typeof auth.$Infer.Session.user;
    session: typeof auth.$Infer.Session.session;
  };
};

export const enforceUserOrAdminAuth = factory.createMiddleware<HonoEnv>(
  async (c, next) => {
    try {
      const session = await auth.api.getSession({
        headers: c.req.raw.headers,
      });
      if (!session) {
        throw new HTTPException(HttpStatus.HTTP_401_UNAUTHORIZED, {
          message: "Unauthorized access",
        });
      }
      // @ts-ignore - temporary fix for Hono context typing
      c.set("user", session.user);
      // @ts-ignore - temporary fix for Hono context typing
      c.set("session", session.session);
      await next();
    } catch (error) {
      console.error("Authentication error:", error);
      throw new HTTPException(HttpStatus.HTTP_401_UNAUTHORIZED, {
        message: "Invalid or expired authentication token",
      });
    }
  },
);
