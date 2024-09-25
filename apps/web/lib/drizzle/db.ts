import * as usersSchema from './user.schema'
import * as workspacesSchema from './workspace.schema'

import * as dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

dotenv.config({ path: '.env.development.local' })

const connectionString = process.env.DATABASE_URL!

if (!connectionString) {
	console.log('🔴 missing database url')
}

const client = postgres(connectionString, { prepare: false, idle_timeout: 5 })

const schema = {
	...usersSchema,
	...workspacesSchema,
}

export const db = drizzle(client, { schema })

// async function applySchema() {
// 	const { migrate } = await import('drizzle-orm/node-postgres/migrator')

// 	try {
// 		console.log('🔵 Applying migrations...')
// 		await migrate(db, { migrationsFolder: 'migrations' })
// 		console.log('🟢 Schema migration done!')
// 	} catch (error) {
// 		console.log('🔴 Error trying to migrate: ', error)
// 	}
// }

// applySchema()
