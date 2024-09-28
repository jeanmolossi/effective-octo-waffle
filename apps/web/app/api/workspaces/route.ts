import { ApiError } from '@/lib/api/errors'
import { withSession } from '@/lib/auth/session'
import { db } from '@/lib/drizzle/db'
import { checkIfUserExists } from '@/lib/drizzle/user.queries'
import { workspaceUsers, workspaces } from '@/lib/drizzle/workspace.schema'
import {
	WorkspaceSchema,
	createWorkspaceSchema,
} from '@/lib/zod/schemas/workspaces'
import { NextResponse } from 'next/server'

export const POST = withSession(async ({ request, user }) => {
	const { name, slug } = await createWorkspaceSchema.parseAsync(
		await request.json(),
	)

	const userExists = await checkIfUserExists(user.id)

	if (!userExists) {
		throw new ApiError({
			code: 'not_found',
			message: 'Session expired. Please log in again.',
		})
	}

	try {
		const workspaceResponse = await db.transaction(async tx => {
			const workspace = await tx.insert(workspaces).values({
				name,
				slug,
			})

			const { value } = workspace.values().next()

			await tx.insert(workspaceUsers).values({
				user_id: user.id,
				workspace_id: value.id,
				role: 'owner',
			})

			return value
		})

		console.log(workspaceResponse)
		return NextResponse.json(
			WorkspaceSchema.parse({
				...workspaceResponse,
				id: `ws_${workspaceResponse.id}`,
			}),
		)
	} catch (error) {
		throw new ApiError({
			code: 'internal_server_error',
			message: error.message,
		})
	}
})
