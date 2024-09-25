import { User } from '@/lib/drizzle/types'
import { createClient } from '@/lib/supabase/server'

export async function getDefaultWorkspace(user: User) {
	let defaultWorkspace = user?.defaultWorkspace || undefined

	console.log('CALLED', user)

	if (!defaultWorkspace) {
		const supabase = createClient()

		const { data, error } = await supabase
			.from('users')
			.select(
				`
				defaultWorkspace,
				workspace_users (
					workspaces (
						slug
					)
				)
			`,
			)
			.eq('id', user.id)
			.limit(1)

		console.log({ data, error })

		// 	const refreshedUser = await db.query.users.findFirst({
		// 		where: eq(users.id, user.id),
		// 		columns: {
		// 			defaultWorkspace: true,
		// 		},
		// 		with: {
		// 			workspaces: {
		// 				with: {
		// 					workspace: {
		// 						columns: {
		// 							slug: true,
		// 						},
		// 					},
		// 				},
		// 			},
		// 		},
		// 	})

		// 	if (refreshedUser) {
		// 		defaultWorkspace =
		// 			refreshedUser.defaultWorkspace ||
		// 			refreshedUser.workspaces[0]?.workspace?.slug ||
		// 			undefined
		// 	}
	}

	return defaultWorkspace
}
