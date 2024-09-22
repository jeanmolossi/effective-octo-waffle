import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-screen w-screen place-content-center md:place-items-center">
			<div className='p-4'>{children}</div>

			<div className='p-4'>
				<h1 className="text-3xl font-bold text-gray-800">
					Conecte-se ao NexoChat e transforme sua comunicação com
					clientes
				</h1>
				<p className="text-lg text-gray-600 mt-4">
					Centralize interações, automatize respostas e potencialize o
					engajamento em uma plataforma única.
				</p>
			</div>
		</div>
	)
}
