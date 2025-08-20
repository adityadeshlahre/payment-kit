"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyEmail() {
  const router = useRouter();
  const queryParams = useSearchParams();
  authClient.verifyEmail({
    query: {
      token: queryParams.get("token") || "",
      callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
    },
  });

  const token = queryParams.get("token");
  if (!token) {
    router.push("/login");
    return (
      <>
        <div className="flex h-screen items-center justify-center">
          <Skeleton className="h-10 w-40" />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
          <p className="mb-6">Please wait while we verify your email...</p>
          {token ? (
            <p className="text-green-500">Verification token: {token}</p>
          ) : (
            <p className="text-red-500">No verification token provided.</p>
          )}
        </div>
      </div>
    </>
  );
}
