// import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(process.env.DATABASE_URL || "");

// export type dbTable = InferSelectModel<typeof db>;
// export type dbNew = InferInsertModel<typeof db>;
