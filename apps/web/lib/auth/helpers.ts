import { createClient } from '@/lib/supabase/server'

export const getSession = async () => {
	const supabase = createClient()
	const { data, error } = await supabase.auth.getUser()

	if (error) {
		console.log('get session failed', error)
		return
	}

	return data
}
