import { render } from "@react-email/render";
import { betterAuth } from "better-auth";
import {
  dodopayments,
  checkout,
  portal,
  webhooks,
} from "@dodopayments/better-auth";
import DodoPayments from "dodopayments";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { expo } from "@better-auth/expo";
import { db } from "../db";
import * as schema from "../db/schema/auth";
import { admin, openAPI } from "better-auth/plugins";
import { resend } from "./resend";
import {
  ResetPasswordTemplate,
  VerifyEmailTemplate,
} from "@/routes/email/templates/template";

export const dodoPaymentClient = new DodoPayments({
  bearerToken:
    process.env.NODE_ENV === "development"
      ? process.env.DODO_API_KEY_TEST
      : process.env.DODO_API_KEY_LIVE,
  environment:
    process.env.NODE_ENV === "development" ? "test_mode" : "live_mode",
});

const createAuth = () =>
  betterAuth({
    socialProviders: {
      google: {
        prompt: "select_account",
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
    },
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: schema,
    }),
    trustedOrigins: [process.env.CORS_ORIGIN || "", "my-better-t-app://"],
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      sendResetPassword: async ({ url, user }) => {
        try {
          const { data, error } = await resend.emails.send({
            from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
            to: user.email,
            subject: "Reset Your Password",
            react: ResetPasswordTemplate({
              url,
              fromMail: process.env.FROM_EMAIL!,
              fromName: process.env.FROM_NAME!,
              userEmail: user.email,
            }),
          });

          if (error) {
            console.error("Failed to send reset password email:", error);
            throw new Error("Failed to send reset password email");
          }

          console.log("Reset password email sent successfully:", data?.id);
        } catch (error) {
          console.error("Error sending reset password email:", error);
          throw error;
        }
      },
    },
    emailVerification: {
      sendVerificationEmail: async ({ url, user }) => {
        try {
          const { data, error } = await resend.emails.send({
            from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
            to: user.email,
            subject: "Verify Your Email Address",
            react: VerifyEmailTemplate({
              url,
              fromMail: process.env.FROM_EMAIL!,
              fromName: process.env.FROM_NAME!,
              userEmail: user.email,
            }),
          });

          if (error) {
            console.error("Failed to send verification email:", error);
            throw new Error("Failed to send verification email");
          }

          console.log("Verification email sent successfully:", data?.id);
        } catch (error) {
          console.error("Error sending verification email:", error);
          throw error;
        }
      },
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      expiresIn: 1800,
      callbackURL: `${process.env.BETTER_AUTH_URL}/verify-email`,
    },
    secret: process.env.BETTER_AUTH_SECRET as string,
    baseURL: process.env.BETTER_AUTH_URL as string,
    telemetry: {
      enabled: false,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
    },
    plugins: [
      admin(),
      expo(),
      openAPI(),
      dodopayments({
        client: dodoPaymentClient,
        createCustomerOnSignUp: true,
        use: [
          checkout({
            products: [
              {
                productId: "pdt_xxxxxxxxxxxxxxxxxxxxx",
                slug: "premium-plan",
              },
            ],
            successUrl: "/dashboard/success",
            authenticatedUsersOnly: true,
          }),
          portal(),
          webhooks({
            webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_SECRET as string,
            onPayload: async (payload: any) => {
              console.log(
                "Received webhook:",
                payload?.event_type || "unknown",
              );
            },
          }),
        ],
      }),
    ],
  });

export const auth = createAuth();
