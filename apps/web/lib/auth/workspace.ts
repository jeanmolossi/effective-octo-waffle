import { getSearchParams } from '@effective-octo-waffle/utils'
import { User, WorkspaceWithUsers } from '../drizzle/types'
import { getSession } from './helpers'
import { ApiError, handleAndReturnErrorResponse } from '../api/errors'
import { db } from '../drizzle/db'
import { SQL, and, eq } from 'drizzle-orm'
import { users } from '../drizzle/user.schema'
import { ratelimit } from '../redis/ratelimit'
import { workspaceInvites, workspaces } from '../drizzle/workspace.schema'
import { subHours, isAfter } from 'date-fns'
import {
	PermissionAction,
	getPermissionsByRole,
	throwIfNoAccess,
} from '../api/acls/permissions'

interface WithWorkspaceHandler {
	({
		request,
		params,
		searchParams,
		headers,
		user,
		workspace,
		permissions,
	}: {
		request: Request
		params: Record<string, string>
		searchParams: Record<string, string>
		headers?: Record<string, string>
		user: User
		permissions: unknown[]
		workspace: WorkspaceWithUsers
	}): Promise<Response>
}

export const withWorkspace =
	(
		handler: WithWorkspaceHandler,
		{
			requiredPermissions = [],
			skipPermissionChecks = false,
		}: {
			requiredPermissions?: PermissionAction[]
			skipPermissionChecks?: boolean
		},
	) =>
	async (
		request: Request,
		{ params = {} }: { params: Record<string, string> | undefined },
	) => {
		const searchParams = getSearchParams(request.url)

		let headers = {}

		try {
			const session = await getSession()

			if (!session?.user.id) {
				throw new ApiError({
					code: 'unauthorized',
					message: 'unauthorized: Login required.',
				})
			}

			let workspaceId: string | undefined
			let workspaceSlug: string | undefined

			const idOrSlug =
				params?.idOrSlug ||
				searchParams.workspaceId ||
				params.slug ||
				searchParams.workspaceSlug

			if (!idOrSlug) {
				throw new ApiError({
					code: 'not_found',
					message:
						'Workspace ID not found. Did you forget to include a `workspaceId` query parameter?',
				})
			}

			if (idOrSlug.startsWith('ws_')) {
				workspaceId = idOrSlug.replace('ws_', '')
			} else {
				workspaceSlug = idOrSlug
			}

			const userId = session.user.id
			const user = await db.query.users.findFirst({
				where: eq(users.id, userId),
			})

			if (!user) {
				throw new ApiError({
					code: 'unauthorized',
					// talvez seja melhor outra mensagem para dizer que o usuario nao esta cadastrado
					message: 'Unauthorized: Access token expired.',
				})
			}

			const { success, limit, reset, remaining } = await ratelimit(
				50,
				'1 m',
			).limit(user.id)

			headers = {
				'Retry-After': reset.toString(),
				'X-RateLimit-Limit': limit.toString(),
				'X-RateLimit-Remaining': remaining.toString(),
				'X-RateLimit-Reset': reset.toString(),
			}

			if (!success) {
				throw new ApiError({
					code: 'rate_limit_exceeded',
					message: 'Too many requests',
				})
			}

			const conditions = [] as Array<SQL<any>>
			if (workspaceId) {
				conditions.push(eq(workspaces.id, workspaceId))
			}

			if (workspaceSlug) {
				conditions.push(eq(workspaces.slug, workspaceSlug))
			}

			let where = conditions.at(0)
			if (conditions.length > 1) {
				where = and(conditions.at(0), conditions.at(1))
			}

			const workspace: WorkspaceWithUsers | undefined =
				await db.query.workspaces.findFirst({
					where,
					with: {
						users: {
							where: eq(users.id, userId),
							columns: {
								role: true,
							},
						},
					},
				})

			// workspace nao existe
			if (!workspace || !workspace.users) {
				throw new ApiError({
					code: 'not_found',
					message: 'Workspace not found',
				})
			}

			// workspace existe mas o usuario nao esta incluido nele
			if (workspace.users.length === 0) {
				const pendingInvites =
					await db.query.workspaceInvites.findFirst({
						where: and(
							eq(workspaceInvites.workspace_id, workspace.id),
							eq(workspaceInvites.user_id, userId),
						),
					})

				const inviteMaxLifeInHours = 2
				const pastInviteLife = subHours(
					new Date(),
					inviteMaxLifeInHours,
				)

				if (!pendingInvites) {
					throw new ApiError({
						code: 'not_found',
						message: 'Workspace not found',
					})
				} else if (isAfter(pendingInvites.created_at, pastInviteLife)) {
					throw new ApiError({
						code: 'invite_expired',
						message: 'Workspace invite expired',
					})
				} else {
					throw new ApiError({
						code: 'invite_pending',
						message: 'Workspace invite pending',
					})
				}
			}

			const permissions = getPermissionsByRole(
				workspace.users.at(0)?.role!,
			)

			if (!skipPermissionChecks) {
				throwIfNoAccess({
					permissions,
					requiredPermissions,
					workspaceId: workspace.id,
				})
			}

			// WIP: planos ?
			// provavelmente aqui devemos checar o plano do usuario

			return await handler({
				request,
				params,
				searchParams,
				headers,
				user,
				workspace,
				permissions,
			})
		} catch (error) {
			console.log('workspace error', error)
			return handleAndReturnErrorResponse(error, headers)
		}
	}
