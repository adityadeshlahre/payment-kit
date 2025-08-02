import { timestamp, varchar } from "drizzle-orm/pg-core";

export const baseColumns = () => ({
  id: varchar({ length: 128 }).primaryKey(),
  createdAt: timestamp({ mode: "date", withTimezone: true }).defaultNow(),
  updatedAt: timestamp({ mode: "date", withTimezone: true })
    .defaultNow()
    .$onUpdateFn(() => new Date()),
  deletedAt: timestamp({ mode: "date", withTimezone: true }),
});
