import { users } from './user.schema'
import { workspaceRoles, workspaceUsers, workspaces } from './workspace.schema'

export type Role = (typeof workspaceRoles.enumValues)[number]

export type User = typeof users.$inferSelect
export type Workspace = typeof workspaces.$inferSelect
export type WorkspaceUser = typeof workspaceUsers.$inferSelect

export type WorkspaceWithUsers = Workspace & {
	users: Partial<WorkspaceUser>[]
}
