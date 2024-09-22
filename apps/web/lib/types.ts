export interface UserProps {
	id: string
	name: string
	email: string
	image?: string
	createdAt: Date
	source: string | null
	defaultWorkspace?: string
}
