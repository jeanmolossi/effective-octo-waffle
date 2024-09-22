import '@/styles/globals.css';
import { ThemeProvider } from '@effective-octo-waffle/ui';
import '@effective-octo-waffle/ui/dist/index.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'NexoChat',
	description: 'Centralize a comunicação com seus clientes em múltiplos canais. Automatize respostas, crie chatbots personalizados e analise métricas para otimizar seu atendimento ao cliente.',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}): JSX.Element {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
