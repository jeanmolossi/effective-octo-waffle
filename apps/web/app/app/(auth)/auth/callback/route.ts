import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

const X_FORWARDED_HOST = 'x-forwarded-host'

export async function GET(request: NextRequest) {
	const { searchParams, protocol, origin } = new URL(request.url)
	const code = searchParams.get('code')
	const redirTo = searchParams.get('redir_to') || '/' // next é a url de redirect (quando existe usamos ela)

	console.log('RECEIVED REQUEST', code, redirTo, origin)

	if (!code) {
		return NextResponse.redirect(`${origin}/auth/auth-code-error`)
	}

	const supabase = createClient()
	const { error } = await supabase.auth.exchangeCodeForSession(code)
	if (error) {
		return NextResponse.redirect(`${origin}/auth/auth-code-error`)
	}

	const isLocal = process.env.NODE_ENV === 'development'

	if (isLocal) {
		return NextResponse.redirect(`${origin}${redirTo}`) // local podemos ignorar qualquer validação de host
	}

	const forwardedHost = request.headers.get(X_FORWARDED_HOST)

	// redireciona para o host original
	if (forwardedHost) {
		return NextResponse.redirect(`https://${forwardedHost}${redirTo}`)
	}

	return NextResponse.redirect(`${origin}${redirTo}`)
}
