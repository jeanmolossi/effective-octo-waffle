'use client';

import { Input, Label } from "@effective-octo-waffle/ui";
import { cn } from "@effective-octo-waffle/utils";

export default function NewWorkspaceForm({ isFirstAnimation, onAnimationEnd }) {
	return (
		<div
			onAnimationEndCapture={onAnimationEnd}
			className={cn(
				"animate-slide-up-fade [animation-duration:1s] [animation-fill-mode:both]",
				{
					'[animation-delay:1s]': isFirstAnimation,
					'[animation-delay:100ms]': !isFirstAnimation,
				}
			)}
		>
			<div className="mb-4">
				<Label>Nome do Workspace <span className="text-red-500">*</span></Label>
				<Input placeholder="NexoChat atendimento" required />
				<small className="italic text-muted-foreground">Nome do Workspace pode ser o nome da empresa</small>
			</div>

			<div>
				<Label>Descrição do Workspace</Label>
				<Input placeholder="Atendimento NexoChat para clientes vip" />
				<small className="italic text-muted-foreground">Preenchimento opcional</small>
			</div>
		</div>
	)
}
