import { relations, sql } from 'drizzle-orm'
import {
	index,
	pgEnum,
	pgTable,
	text,
	timestamp,
	unique,
	varchar,
} from 'drizzle-orm/pg-core'
import { users } from './user.schema'

export const workspaces = pgTable('workspaces', {
	id: text('id')
		.notNull()
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	name: varchar('name').notNull(),
	slug: varchar('slug').notNull().unique(),

	invite_code: varchar('invite_code').unique(),
})

export const workspaceRelations = relations(workspaces, ({ many }) => ({
	users: many(workspaceUsers),
}))

export const workspaceRoles = pgEnum('workspace_roles', ['owner', 'member'])

export const workspaceUsers = pgTable(
	'workspace_users',
	{
		id: text('id')
			.notNull()
			.primaryKey()
			.default(sql`gen_random_uuid()`),
		role: workspaceRoles('role').default('member').notNull(),
		created_at: timestamp('created_at', { withTimezone: true })
			.notNull()
			.defaultNow(),
		updated_at: timestamp('updated_at', { withTimezone: true })
			.notNull()
			.defaultNow()
			.$onUpdateFn(() => new Date()),

		user_id: varchar('user_id')
			.references(() => users.id, { onDelete: 'cascade' })
			.notNull(),
		workspace_id: text('workspace_id')
			.references(() => workspaces.id, { onDelete: 'cascade' })
			.notNull(),
	},
	table => ({
		single_user_per_workspace: unique().on(
			table.user_id,
			table.workspace_id,
		),
		workspace_user_wkspc_idx: index('workspace_user_wkspc_idx').on(
			table.workspace_id,
		),
	}),
)

export const workspaceUsersRelations = relations(workspaceUsers, ({ one }) => ({
	user: one(users, {
		fields: [workspaceUsers.user_id],
		references: [users.id],
	}),
	workspace: one(workspaces, {
		fields: [workspaceUsers.workspace_id],
		references: [workspaces.id],
	}),
}))

export const workspaceInvites = pgTable('workspace_invites', {})
