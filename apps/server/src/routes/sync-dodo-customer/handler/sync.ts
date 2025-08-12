import { db } from "@/db";
import { dodoCustomer } from "@/db/schema/dodo-customer";
import factory from "@/lib/factory";
import type { Context } from "hono";
import { auth, dodoPaymentClient } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { HttpStatus } from "@/lib/errors";

export const handleSyncDodoCustomer = factory.createHandlers(
  async (c: Context) => {
    try {
      const session = await auth.api.getSession({
        headers: c.req.raw.headers,
      });
      const user = session?.user;

      if (!user?.email) {
        return c.json(
          { error: "User email not found" },
          {
            status: HttpStatus.HTTP_400_BAD_REQUEST,
          },
        );
      }

      const existingCustomer = await db
        .select()
        .from(dodoCustomer)
        .where(eq(dodoCustomer.userId, user.id))
        .limit(1);

      if (existingCustomer.length > 0) {
        return c.json({
          message: "DodoPayments customer already exists",
          customer: existingCustomer[0],
        });
      }

      // Create or find customer in DodoPayments
      const customers = await dodoPaymentClient.customers.list({
        email: user.email,
      });

      let customer = customers.items[0];
      if (!customer) {
        // Create customer if doesn't exist
        customer = await dodoPaymentClient.customers.create({
          email: user.email,
          name: user.name || "",
        });
      }

      // Store DodoPayments customer data in our database
      const [newDodoCustomer] = await db
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
        .returning();

      return c.json({
        message: "DodoPayments customer synced successfully",
        customer: newDodoCustomer,
      });
    } catch (error) {
      console.error("Error syncing DodoPayments customer:", error);
      return c.json({ error: "Failed to sync DodoPayments customer" }, 500);
    }
  },
);
