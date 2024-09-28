import { roles } from '@/lib/types'
import { z } from 'zod'

export const roleSchema = z
	.enum(roles)
	.describe('The role of the authenticated user in the workspace')
