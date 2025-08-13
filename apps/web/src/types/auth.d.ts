import type { DodoCustomerData } from "@repo/types";

declare module "better-auth/types" {
    interface Session {
        dodo?: DodoCustomerData | null;
    }
}
