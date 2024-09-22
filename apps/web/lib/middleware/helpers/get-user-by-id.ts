import { db } from '@/lib/drizzle/db'
import { User } from '@/lib/drizzle/types'
import { users } from '@/lib/drizzle/user.schema'
import { eq } from 'drizzle-orm'

export async function getUserByID<T extends { id: any }>(
	userProvided: T | null,
): Promise<User | undefined> {
	if (!userProvided) return

	const user = await db.query.users.findFirst({
		where: eq(users.id, userProvided.id),
	})

	return user
}
