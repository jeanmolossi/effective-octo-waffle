export interface UserProps {
	id: string
	name: string
	email: string
	image?: string
	createdAt: Date
	source: string | null
	defaultWorkspace?: string
}

export const roles = ['owner', 'member'] as const

export type Role = (typeof roles)[number]
