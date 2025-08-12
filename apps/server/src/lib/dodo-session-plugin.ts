import type { BetterAuthPlugin } from "better-auth";
import { db } from "../db";
import { dodoCustomer } from "../db/schema/dodo-customer";
import { eq } from "drizzle-orm";

export const dodoSessionPlugin = (): BetterAuthPlugin => {
  return {
    id: "dodo-session",
    hooks: {
      after: [
        {
          matcher(c: any) {
            return c.path === "/session" && c.method === "GET";
          },
          handler: async (c: any) => {
            try {
              const session = c.context.returned;
              if (!session?.user?.id) return;

              const [customerData] = await db
                .select()
                .from(dodoCustomer)
                .where(eq(dodoCustomer.userId, session.user.id))
                .limit(1);

              if (customerData) {
                c.context.returned = {
                  ...session,
                  session: {
                    ...session.session,
                    dodo: {
                      customer_id: customerData.customerId,
                      business_id: customerData.businessId,
                      email: customerData.email,
                      name: customerData.name,
                      phone_number: customerData.phoneNumber,
                      created_at: customerData.dodoCreatedAt.toISOString(),
                    },
                  },
                };
              }
            } catch (error) {
              console.error(
                "Error fetching DodoPayments customer data:",
                error,
              );
            }
          },
        },
        {
          matcher(c: any) {
            return c.path === "/sign-up/email" && c.method === "POST";
          },
          handler: async (c: any) => {
            try {
              const user = c.context.returned?.user;
              if (!user?.email) return;

              const { dodoPaymentClient } = await import("./auth");

              const customers = await dodoPaymentClient.customers.list({
                email: user.email,
              });

              let customer = customers.items[0];
              if (!customer) {
                customer = await dodoPaymentClient.customers.create({
                  email: user.email,
                  name: user.name || "",
                });
              }

              await db
                .insert(dodoCustomer)
                .values({
                  id: `dodo_${user.id}`,
                  userId: user.id,
                  customerId: customer.customer_id,
                  businessId: customer.business_id,
                  email: customer.email,
                  name: customer.name,
                  phoneNumber: customer.phone_number || null,
                  dodoCreatedAt: new Date(customer.created_at),
                  createdAt: new Date(),
                  updatedAt: new Date(),
                })
                .onConflictDoNothing();

              console.log(
                `DodoPayments customer ${customer.customer_id} stored for user ${user.id}`,
              );
            } catch (error) {
              console.error("Error storing DodoPayments customer:", error);
            }
          },
        },
      ],
    },
  };
};
