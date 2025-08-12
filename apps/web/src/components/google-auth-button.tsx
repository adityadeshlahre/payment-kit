"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";

export default function GoogleAuthButton({
  label = "Continue with Google",
}: {
  label?: string;
}) {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social(
        {
          provider: "google",
          // idToken: {
          //   token: "",
          //   accessToken: "",
          // },
        },
        {
          onSuccess: () => {
            router.push("/dashboard");
            toast.success("Signed in with Google");
          },
          onError: (error) => {
            toast.error(error?.error?.message || "Google sign-in failed");
          },
        },
      );
    } catch (err) {
      console.error("Google sign-in error:", err);
      toast.error("Unexpected error during Google sign-in");
    }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      className="w-full text-black bg-gray-200 hover:bg-gray-300"
    >
      <FcGoogle /> {label}
    </Button>
  );
}
