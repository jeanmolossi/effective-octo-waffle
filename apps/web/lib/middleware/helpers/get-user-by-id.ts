import { User } from '@/lib/drizzle/types'
import { createClient } from '@/lib/supabase/server'

type UserProvided = {
	id: string
	name?: string
	full_name?: string
	email?: string
	email_confirmed_at?: string
	confirmed_at?: string
	avatar_url?: string
}

export async function getUserByID<T extends UserProvided>(
	userProvided: T | null,
): Promise<User | undefined> {
	if (!userProvided) return

	const supabase = createClient()
	const { error, data } = await supabase
		.from('users')
		.select('*')
		.eq('id', userProvided.id)
		.limit(1)

	if (error) {
		console.log('get-user-by-id helpers fails', error)
		return
	}

	let user = data?.at(0)

	if (!user) {
		let emailVerified: Date | null = null
		if (userProvided.email_confirmed_at) {
			emailVerified = new Date(userProvided.email_confirmed_at)
		}
		if (!emailVerified && userProvided.confirmed_at) {
			emailVerified = new Date(userProvided.confirmed_at)
		}
		if (!userProvided.email) {
			return
		}

		const { data, error } = await supabase
			.from('users')
			.insert({
				id: userProvided.id,
				name:
					userProvided.name ||
					userProvided.full_name ||
					'Desconhecido',
				email: userProvided.email,
				emailVerified,
				image: userProvided.avatar_url,
			})
			.select()

		if (error) {
			console.log('get user by id fail to create', error)
			return
		}

		user = data.at(0)
	}

	return user
}
