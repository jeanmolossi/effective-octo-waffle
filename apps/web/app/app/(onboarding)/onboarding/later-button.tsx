'use client';

import { OnboardingStep } from "@/lib/onboarding/types";
import { Button } from "@effective-octo-waffle/ui";
import { LoaderCircle } from "lucide-react";
import { PropsWithChildren } from "react";
import { useOnboardingProgress } from "./use-onboarding-progress";

export function LaterButton({ next, children }: PropsWithChildren<{ next: OnboardingStep | 'finish'; }>) {
	const { continueTo, finish, isLoading, isSuccessful } = useOnboardingProgress()

	const handleClick = () => {
		if (next === 'finish') {
			return finish()
		}

		return continueTo(next)
	}

	const disabled = isLoading || isSuccessful;

	return (
		<Button disabled={disabled} onClick={handleClick}>
			{disabled && <LoaderCircle className="animate-spin" />}

			{children || 'Fazer isso mais tarde'}
		</Button>
	)
}
