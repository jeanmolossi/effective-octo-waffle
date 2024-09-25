import { User } from '@/lib/drizzle/types'
import { OnboardingStep } from '@/lib/onboarding/types'
import { client } from '@/lib/redis/client'

export async function getOnboardingStep(user: User): Promise<OnboardingStep> {
	if (!user) {
		throw new Error('user should exists')
	}

	return (await client.get(`onboarding-step:${user.id}`)) as OnboardingStep
}
