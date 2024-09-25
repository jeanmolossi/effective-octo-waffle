import * as dotenv from 'dotenv'
import { Config } from 'drizzle-kit'

dotenv.config({ path: '.env.development.local' })

const connectionString = process.env.DATABASE_URL!

if (!connectionString) {
	console.log('🔴 Missing DATABASE_URL')
}

export default {
	schema: [
		'./lib/drizzle/user.schema.ts',
		'./lib/drizzle/workspace.schema.ts',
	],
	out: './migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: connectionString,
	},
} satisfies Config
