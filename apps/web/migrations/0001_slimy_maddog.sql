DO $$ BEGIN
 CREATE TYPE "public"."invites_status" AS ENUM('pending', 'accepted', 'refused');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "workspace_invites" ADD COLUMN "id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "workspace_invites" ADD COLUMN "role" "workspace_roles" DEFAULT 'member' NOT NULL;--> statement-breakpoint
ALTER TABLE "workspace_invites" ADD COLUMN "status" "invites_status" DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE "workspace_invites" ADD COLUMN "user_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "workspace_invites" ADD COLUMN "workspace_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "workspace_invites" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "workspace_invites" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workspace_invites" ADD CONSTRAINT "workspace_invites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workspace_invites" ADD CONSTRAINT "workspace_invites_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "workspace_user_invite_idx" ON "workspace_invites" USING btree ("user_id","workspace_id");--> statement-breakpoint
ALTER TABLE "workspace_invites" ADD CONSTRAINT "workspace_invites_user_id_workspace_id_unique" UNIQUE("user_id","workspace_id");