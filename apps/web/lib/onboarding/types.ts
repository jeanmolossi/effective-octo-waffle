export const ONBOARDING_STEPS = [
	'workspace',
	'convite',
	'plano',
	'finalizado',
] as const

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number]
