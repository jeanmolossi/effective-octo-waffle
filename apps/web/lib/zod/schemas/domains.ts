import { z } from 'zod'

export const DomainSchema = z.object({
	id: z.string().describe('The unique identifier of the domain'),
	slug: z.string().describe('The domain name.'),
})
