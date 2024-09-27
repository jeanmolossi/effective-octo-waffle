import { sleep } from "@/lib/helpers";
import { Button } from "@effective-octo-waffle/ui";
import { Copy } from "lucide-react";

export default async function PendingInvites() {
	await sleep(2000)
	return (
		<div className="w-full md:max-w-screen-sm space-y-4 animate-fade-in [animation-fill-mode:both]">
			<h2 className="text-lg font-medium">
				Encontramos estes convites pendentes:
			</h2>

			<div className="flex flex-col gap-4">
				<div className="grid grid-cols-[auto,_42px] border rounded p-4 gap-4 w-full">
					<div>
						<h3 className="font-medium">Nome do workspace</h3>
						<p className="text-sm text-muted-foreground">Descricao do workspace</p>

						<small className="block max-w-[204px] sm:max-w-sm md:max-w-md text-xs truncate overflow-hidden text-muted-foreground">
							7c6c6e88b17f0c20c95f54c7d6986ab7ab7d9eeb04e8803352ddeaea48015a39
						</small>
					</div>

					<Button title="Copiar" size='icon' variant='outline' className="shrink-0">
						<Copy />
					</Button>
				</div>
			</div>

			<em className="block text-sm my-4">Nenhum corresponde ao que você procura? Insira o código do convite abaixo</em>
		</div>
	)
}
