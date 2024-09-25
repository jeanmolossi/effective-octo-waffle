'use client'

import GoogleIcon from "@/components/icons/google"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@effective-octo-waffle/ui"
import { APP_DOMAIN } from "@effective-octo-waffle/utils"

export default function GoogleButton() {
	const handleLogin = async () => {
		const supabase = createClient()
		const { data } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${APP_DOMAIN}/auth/callback`
			}
		})

		console.log('DATA URL', data.url, APP_DOMAIN)
	}

	return (
		<form>
			<Button type="button" variant="outline" size="icon" className="p-1" onClick={handleLogin}>
				<GoogleIcon />
			</Button>
		</form>
	)
}
