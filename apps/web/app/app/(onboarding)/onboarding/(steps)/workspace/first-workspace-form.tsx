'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { cn } from '@effective-octo-waffle/utils'
import NewWorkspaceForm from './new-workspace'
import WorkspaceOptions from './workspace-options'
import InviteCode from './invite-code'
import { useOnboardingProgress } from '../../use-onboarding-progress'

export default function FirstWorkspaceForm() {
	const searchParams = useSearchParams()
	const { continueTo, isLoading, isSuccessful } = useOnboardingProgress()

	const [option, setOption] = useState('new')
	const [animated, setAnimated] = useState(true)

	const inviteCode = searchParams.get('invite')
	const isOptionNew = option === 'new' && !inviteCode

	return (
		<>
			{!inviteCode && (
				<WorkspaceOptions
					isOptionNew={isOptionNew}
					setOption={setOption}
				/>
			)}

			{isOptionNew ? (
				<div
					onAnimationEndCapture={() => setAnimated(false)}
					className={cn(
						'animate-slide-up-fade [animation-duration:1s] [animation-fill-mode:both]',
						{
							'[animation-delay:1s]': animated,
							'[animation-delay:100ms]': !animated,
						},
					)}
				>
					<NewWorkspaceForm
						onSuccess={({ slug }) => {
							continueTo('plano', { slug })
						}}
						isLoading={isLoading || isSuccessful}
					/>
				</div>
			) : (
				<InviteCode inviteCode={inviteCode} />
			)}
		</>
	)
}
