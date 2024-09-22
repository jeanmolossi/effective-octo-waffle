import { users } from './user.schema'
import { workspaces } from './workspace.schema'

export type User = typeof users.$inferSelect
export type Workspace = typeof workspaces.$inferSelect
