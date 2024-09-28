'use client'

import { useCallback } from 'react'
import { LoaderCircle } from 'lucide-react'
import slugify from '@sindresorhus/slugify'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Input, Label } from '@effective-octo-waffle/ui'
import { toast } from 'sonner'
import { mutate } from 'swr'

type FormData = {
	name: string
	slug: string
	description: string
}

const workspaceSlug = (text: string) =>
	slugify(text, {
		customReplacements: [['@', 'at']],
		lowercase: true,
	})

export default function NewWorkspaceForm({
	onSuccess,
	isLoading,
}: {
	onSuccess?(data: FormData): void
	isLoading: boolean
}) {
	const { handleSubmit, setValue, register, setError } = useForm<FormData>()

	const onSubmit: SubmitHandler<FormData> = useCallback(async data => {
		try {
			console.log('BEFORE')
			const res = await fetch('/api/workspaces', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'same-origin',
				body: JSON.stringify(data),
				cache: 'no-cache',
			})

			console.log('BEFORE res.ok')
			if (res.ok) {
				const { id: workspaceId } = await res.json()
				await mutate('/api/workspaces')
				onSuccess?.(data)
			} else {
				const { error } = await res.json()
				const message = error.message

				if (message.toLowerCase().includes('slug')) {
					return setError('name', { message })
				}

				toast.error('Não foi possível continuar. Tente novamente.')
			}
		} catch (error) {
			console.log('failed', error)
			setError('root.serverError', {
				message: 'Falha ao criar workspace',
			})

			toast.error('Não foi possível continuar. Tente novamente.')
		}
	}, [])

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="mb-4">
				<Label>
					Nome do Workspace <span className="text-red-500">*</span>
				</Label>
				<Input
					placeholder="NexoChat atendimento"
					required
					{...register('name', {
						onChange: e =>
							setValue('slug', workspaceSlug(e.target.value)),
					})}
				/>
				<small className="italic text-muted-foreground">
					Nome do Workspace pode ser o nome da empresa
				</small>
			</div>

			<div>
				<Label>Descrição do Workspace</Label>
				<Input
					placeholder="Atendimento NexoChat para clientes vip"
					{...register('description')}
				/>
				<small className="italic text-muted-foreground">
					Preenchimento opcional
				</small>
			</div>

			<Button>
				{isLoading && <LoaderCircle className="animate-spin" />}
				Proximo
			</Button>
		</form>
	)
}
