import { Label, RadioGroup, RadioGroupItem } from "@effective-octo-waffle/ui";

interface WorkspaceOptionsProps {
	setOption(opt: 'new' | 'join'): void
	isOptionNew: boolean
}

export default function WorkspaceOptions({ setOption, isOptionNew }: WorkspaceOptionsProps) {
	return (
		<RadioGroup defaultValue="new" onValueChange={setOption} className="animate-slide-up-fade [animation-delay:750ms] [animation-duration:1s] [animation-fill-mode:both]">
			<Label data-checked={isOptionNew ? 'true' : 'false'} className="flex gap-2 border rounded p-4 transition-all data-[checked=true]:border-primary">
				<div className="flex flex-col gap-1 flex-1">
					<span className="text-lg">Criar um novo workspace</span>
					<p className="text-sm text-muted-foreground">Vamos criar e configurar um workspace fácil e rápido</p>
				</div>

				<RadioGroupItem className="transition-opacity aria-[checked=false]:opacity-40" value="new" id="new" />
			</Label>

			<Label data-checked={!isOptionNew ? 'true' : 'false'} className="flex gap-2 border rounded p-4 transition-all data-[checked=true]:border-primary">
				<div className="flex flex-col gap-1 flex-1">
					<span className="text-lg">Juntar-se a um workspace existente</span>
					<p className="text-sm text-muted-foreground">Você usa um convite para entrar em um workspace já existente</p>
				</div>

				<RadioGroupItem className="transition-opacity aria-[checked=false]:opacity-40" value=" join" id="join" />
			</Label>
		</RadioGroup>
	)
}
