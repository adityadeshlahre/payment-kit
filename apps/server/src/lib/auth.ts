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
import { admin } from "better-auth/plugins";

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
    },
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [
      admin(),
      expo(),
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
            onPayload: async (payload) => {
              console.log("Received webhook:", payload.event_type);
            },
          }),
        ],
      }),
    ],
  });

export const auth = createAuth();
