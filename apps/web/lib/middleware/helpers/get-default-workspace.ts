import { db } from '@/lib/drizzle/db'
import { User } from '@/lib/drizzle/types'
import { users } from '@/lib/drizzle/user.schema'
import { eq } from 'drizzle-orm'

export async function getDefaultWorkspace(user: User) {
	let defaultWorkspace = user?.defaultWorkspace || undefined

	if (!defaultWorkspace) {
		const refreshedUser = await db.query.users.findFirst({
			where: eq(users.id, user.id),
			columns: {
				defaultWorkspace: true,
			},
			with: {
				workspaces: {
					with: {
						workspace: {
							columns: {
								slug: true,
							},
						},
					},
				},
			},
		})

		defaultWorkspace =
			refreshedUser?.defaultWorkspace ||
			refreshedUser?.workspaces[0]?.workspace?.slug ||
			undefined
	}

	return defaultWorkspace
}
