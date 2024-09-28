import { count, eq } from 'drizzle-orm'
import { db } from './db'
import { users } from './user.schema'

export const checkIfUserExists = async (userID: string) => {
	const result = await db
		.select({ value: count(users.id) })
		.from(users)
		.limit(1)
		.where(eq(users.id, userID))

	return result && result.length > 0
}
