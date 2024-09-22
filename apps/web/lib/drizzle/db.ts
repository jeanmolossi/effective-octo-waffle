import * as usersSchema from './user.schema'
import * as workspacesSchema from './workspace.schema'

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL!

const client = postgres(connectionString, {
	prepare: false,
	idle_timeout: 5,
})

export const db = drizzle(client, {
	schema: {
		...usersSchema,
		...workspacesSchema,
	},
})
