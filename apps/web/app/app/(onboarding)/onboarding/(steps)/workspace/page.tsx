'use client'

import { NextButton } from "../../next-button";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import NewWorkspaceForm from "./new-workspace";
import WorkspaceOptions from "./workspace-options";
import InviteCode from "./invite-code";

export default function Workspace() {
	const searchParams = useSearchParams()

	const [option, setOption] = useState('new')
	const [animated, setAnimated] = useState(true)

	const hasInvite = searchParams.has('invite')
	const isOptionNew = option === 'new'

	return (
		<div className="relative flex flex-col gap-4 w-full max-w-screen-sm">
			<h1 className="animate-slide-up-fade mt-10 text-2xl font-medium [--offset:10px] [animation-delay:250ms] [animation-duration:1s] [animation-fill-mode:both]">
				Vamos configurar seu workspace
			</h1>

			<p className="animate-slide-up-fade mt-2 text-gray-500 [--offset:10px] [animation-delay:500ms] [animation-duration:1s] [animation-fill-mode:both]">
				Vamos começar com seu primeiro workspace
			</p>

			{!hasInvite && <WorkspaceOptions isOptionNew={isOptionNew} setOption={setOption} />}

			{isOptionNew ? <NewWorkspaceForm isFirstAnimation={animated} onAnimationEnd={() => setAnimated(false)} /> : <InviteCode />}

			<NextButton step="plano" />
		</div >
	)
}
