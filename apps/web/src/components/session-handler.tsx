"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useUserStore } from "@/store/user";
import type { loginViEmailReponse } from "@repo/types";

export default function SessionHandler() {
  const { data: session, isPending } = authClient.useSession();
  const setUser = useUserStore((state) => state.login);
  const logout = useUserStore((state) => state.logout);

  useEffect(() => {
    if (!isPending) {
      if (session?.user) {
        const userForStore: loginViEmailReponse = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          image: session.user.image || "",
          emailVerified: session.user.emailVerified,
          createdAt: session.user.createdAt.toISOString(),
          updatedAt: session.user.updatedAt.toISOString(),
        };
        setUser(userForStore);
      } else {
        logout();
      }
    }
  }, [session, isPending, setUser, logout]);

  return null;
}
