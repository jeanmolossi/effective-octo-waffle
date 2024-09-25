'use client';

import { OnboardingStep } from "@/lib/onboarding/types";
import { Button, ButtonProps } from "@effective-octo-waffle/ui";
import { LoaderCircle } from "lucide-react";
import { useOnboardingProgress } from "./use-onboarding-progress";

export function NextButton({ step, ...props }: { step: OnboardingStep } & ButtonProps) {
	const { continueTo, isLoading, isSuccessful } = useOnboardingProgress()

	return (
		<Button onClick={() => continueTo(step)} {...props}>
			{(isLoading || isSuccessful) && <LoaderCircle className="animate-spin" />}
			Próximo
		</Button>
	)
}

