import { z } from 'zod'
import slugify from '@sindresorhus/slugify'
import {
	DEFAULT_REDIRECTS,
	validDomainRegex,
	validSlugRegex,
} from '@effective-octo-waffle/utils'
import { roleSchema } from './misc'
import { DomainSchema } from './domains'

export const WorkspaceSchema = z.object({
	id: z.string().describe('The unique ID of the workspace'),
	name: z.string().describe('The name of the workspace'),
	slug: z.string().describe('The slug of the workspace'),
	created_at: z
		.date()
		.describe('The date and time when the workspace was created.'),
	users: z
		.array(
			z.object({
				role: roleSchema,
			}),
		)
		.describe('The role of the authenticated user in the workspace'),
	domains: z
		.array(
			DomainSchema.pick({
				id: true,
			}),
		)
		.describe('The domains of the workspace'),
})

export const createWorkspaceSchema = z.object({
	name: z.string().min(1).max(32),
	slug: z
		.string()
		.min(3, 'Slug must be at least 3 characters')
		.max(48, 'slug must be less than 48 characters')
		.transform(v => slugify(v))
		.refine(v => validSlugRegex.test(v), { message: 'Invalid slug format' })
		.refine(v => !DEFAULT_REDIRECTS[v], {
			message: 'Cannot use reserved slugs',
		}),
	domain: z.string().refine(v => validDomainRegex.test(v), {
		message: 'Invalid domain format',
	}),
})
