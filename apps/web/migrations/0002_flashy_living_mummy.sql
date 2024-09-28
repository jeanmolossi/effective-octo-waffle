ALTER TABLE "workspace_invites" ADD COLUMN "sender_id" varchar NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workspace_invites" ADD CONSTRAINT "workspace_invites_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
