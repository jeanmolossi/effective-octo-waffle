import FirstWorkspaceForm from './first-workspace-form'

export default function Workspace() {
	return (
		<div className="relative flex flex-col gap-4 w-full max-w-screen-sm">
			<h1 className="animate-slide-up-fade mt-10 text-2xl font-medium [--offset:10px] [animation-delay:250ms] [animation-duration:1s] [animation-fill-mode:both]">
				Vamos configurar seu workspace
			</h1>

			<p className="animate-slide-up-fade mt-2 text-gray-500 [--offset:10px] [animation-delay:500ms] [animation-duration:1s] [animation-fill-mode:both]">
				Vamos começar com seu primeiro workspace
			</p>

			<FirstWorkspaceForm />
		</div>
	)
}
