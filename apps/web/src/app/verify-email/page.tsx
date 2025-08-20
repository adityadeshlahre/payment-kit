"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VerifyEmail() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Email Verified!</h1>
        <p className="mb-6">Thanks for confirming your email address.</p>
        <p className="text-sm text-gray-500">
          Redirecting you to your dashboard...
        </p>
      </div>
    </div>
  );
}
