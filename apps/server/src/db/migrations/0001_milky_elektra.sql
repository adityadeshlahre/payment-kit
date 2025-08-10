CREATE TABLE "dodo_customer" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"customer_id" text NOT NULL,
	"business_id" text NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"phone_number" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"dodo_created_at" timestamp NOT NULL,
	CONSTRAINT "dodo_customer_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "dodo_customer_customer_id_unique" UNIQUE("customer_id")
);
--> statement-breakpoint
ALTER TABLE "dodo_customer" ADD CONSTRAINT "dodo_customer_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;