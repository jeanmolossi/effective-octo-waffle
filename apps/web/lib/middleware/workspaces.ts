import { NextRequest, NextResponse } from 'next/server'
import { User } from '../drizzle/types'
import {
	getDefaultWorkspace,
	isTopLevelSettingsRedirect,
	parse,
} from './helpers'

const LOGIN_PAGE = '/acessar'
const REGISTER_PAGE = '/cadastro'

export default async function WorkspacesMiddleware(
	request: NextRequest,
	user: User,
) {
	const { path, searchParamsStr } = parse(request)

	const defaultWorkspace = await getDefaultWorkspace(user)

	if (!defaultWorkspace) {
		return NextResponse.redirect(new URL('/workspace', request.url))
	}

	let redirectPath = path
	if (['/', LOGIN_PAGE, REGISTER_PAGE].includes(path)) {
		redirectPath = ''
	} else if (isTopLevelSettingsRedirect(path)) {
		redirectPath = `/configuracoes/${path}`
	}

	return NextResponse.redirect(
		new URL(
			`/${defaultWorkspace}${redirectPath}${searchParamsStr}`,
			request.url,
		),
	)
}
