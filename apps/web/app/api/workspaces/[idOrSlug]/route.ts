import { withWorkspace } from '@/lib/auth/workspace'
import { WorkspaceSchema } from '@/lib/zod/schemas/workspaces'
import { NextResponse } from 'next/server'

export const GET = withWorkspace(
	async ({ workspace, headers }) => {
		const domains = []

		return NextResponse.json(
			WorkspaceSchema.parse({
				...workspace,
				id: `ws_${workspace.id}`,
				domains,
			}),
			{ headers },
		)
	},
	{
		requiredPermissions: ['workspaces.read'],
	},
)
