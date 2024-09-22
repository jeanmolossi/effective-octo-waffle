import { Button } from "@effective-octo-waffle/ui";
import Link from "next/link";

export default function Page() {
	return (
		<div>
			<h1>Cadastro</h1>

			<p>
				Já possui conta?{' '}
				<Button asChild variant="link" className='text-md'>
					<Link href="/acessar">Acesse</Link>
				</Button>
			</p>
		</div>
	)
}
