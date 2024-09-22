import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = (request: NextRequest) => {
	let supabaseResponse = NextResponse.next({ request })

	const sup = createServerClient(SUPABASE_URL!, ANON_KEY!, {
		cookies: {
			getAll() {
				return request.cookies.getAll()
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value }) =>
					request.cookies.set(name, value),
				)

				supabaseResponse = NextResponse.next({ request })
				cookiesToSet.forEach(({ name, value, options }) =>
					supabaseResponse.cookies.set(name, value, options),
				)
			},
		},
	})

	return {
		supabase: sup,
		response: supabaseResponse,
	}
}
