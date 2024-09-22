import { relations, sql } from 'drizzle-orm'
import { index, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { workspaceUsers } from './workspace.schema'

export const users = pgTable(
	'users',
	{
		id: varchar('id')
			.primaryKey()
			.notNull()
			.default(sql`gen_random_uuid()`),
		name: varchar('name'),
		email: varchar('email').unique(),
		emailVerified: timestamp('emailVerified'),
		image: text('image'),
		source: varchar('source'), // de onde veio o usuario
		defaultWorkspace: varchar('defaultWorkspace'),

		created_at: timestamp('created_at', { withTimezone: true })
			.notNull()
			.defaultNow(),
		updated_at: timestamp('updated_at', { withTimezone: true })
			.notNull()
			.defaultNow()
			.$onUpdateFn(() => new Date()),
	},
	table => {
		return {
			usersSourceIdx: index('users_source_idx').on(table.name),
		}
	},
)

export const usersRelations = relations(users, ({ many }) => ({
	workspaces: many(workspaceUsers),
}))
