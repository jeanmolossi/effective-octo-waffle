import { Button } from '@effective-octo-waffle/ui'
import Link from 'next/link'
import LoginForm from './form'

export default function Page() {
	return (
		<div>
			<LoginForm />

			<p>
				Ainda não possui conta?{' '}
				<Button asChild variant="link" className='text-md'>
					<Link href="/cadastro">Cadastre-se</Link>
				</Button>
			</p>
		</div>
	)
}
