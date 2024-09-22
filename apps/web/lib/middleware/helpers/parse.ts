import { SHORT_DOMAIN } from '@effective-octo-waffle/utils'
import { NextRequest } from 'next/server'

export const parse = (req: NextRequest) => {
	let domain = req.headers.get('host') as string
	// remover www. do dominio e converter pra lowercase
	domain = domain.replace('www.', '').toLowerCase()

	if (domain === 'nexo.localhost:3000' || domain.endsWith('.vercel.app')) {
		// pra dev local e URLs de preview
		domain = SHORT_DOMAIN
	}

	// path é o caminho da url (ex: nexochat.com/dashboard/chats -> /dashboard/chats)
	let path = req.nextUrl.pathname

	// fullPath é a url completa (inclui os search params)
	const searchParams = req.nextUrl.searchParams.toString()
	const searchParamsStr = searchParams.length > 0 ? `?${searchParams}` : ''
	const fullPath = `${path}${searchParamsStr}`

	// Aqui, usamos o decodeURIComponent pra lidar com caracteres especiais
	const key = decodeURIComponent(path.split('/')[1]) // key é a primeira parte do caminho (ex: nexochat.com/dashboard/chats -> dashboard)
	const fullKey = decodeURIComponent(path.slice(1)) // fullKey é o path completo sem a primeira barra (ex: nexochat.com/dashboard/chats -> dashboard/chats)

	return { domain, path, fullPath, key, fullKey, searchParamsStr }
}
