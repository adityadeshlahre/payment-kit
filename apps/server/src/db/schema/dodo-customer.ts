import {
    pgTable,
    text,
    timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

export const dodoCustomer = pgTable("dodo_customer", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" })
        .unique(),
    customerId: text("customer_id").notNull().unique(),
    businessId: text("business_id").notNull(),
    email: text("email").notNull(),
    name: text("name").notNull(),
    phoneNumber: text("phone_number"),
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => new Date())
        .notNull(),
    dodoCreatedAt: timestamp("dodo_created_at").notNull(),
});
