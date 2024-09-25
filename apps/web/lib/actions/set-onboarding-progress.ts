'use server'

import { z } from 'zod'
import { ONBOARDING_STEPS } from '../onboarding/types'
import { client } from '../redis/client'
import { authUserActionClient } from './safe-action'

export const setOnboardingProgress = authUserActionClient
	.schema(
		z.object({
			onboardingStep: z.enum(ONBOARDING_STEPS).nullable(),
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		const { onboardingStep } = parsedInput

		try {
			await client.set(`onboarding-step:${ctx.user.id}`, onboardingStep)
		} catch (e) {
			console.error('failed to update onboarding step', e)
			throw new Error('Failed to update onboarding step')
		}

		return { success: true }
	})
