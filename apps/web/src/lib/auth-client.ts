import { dodopaymentsClient } from "@dodopayments/better-auth";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL as string,
  plugins: [dodopaymentsClient()],
});
