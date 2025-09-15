import { WorkspaceRole } from '@prisma/client';
import z from 'zod';

export const createWorkspaceMemberSchema = z.object({
  userId: z.string(),
  workspaceId: z.string(),
  role: z.enum(WorkspaceRole).default(WorkspaceRole.VIEWER).optional(),
});

export const inviteWorkspaceMemberSchema = z.object({
  email: z.string().email(),
  role: z.enum(WorkspaceRole),
});

export const joinWorkspaceSchema = z.object({
  inviteUrl: z.string().url(),
});

export const queryWorkspaceMembersSchema = z.object({
  workspaceId: z.string(),
});

export type CreateWorkspaceMemberSchema = z.infer<typeof createWorkspaceMemberSchema>;
export type InviteWorkspaceMemberSchema = z.infer<typeof inviteWorkspaceMemberSchema>;
export type JoinWorkspaceSchema = z.infer<typeof joinWorkspaceSchema>;
export type QueryWorkspaceMembers = z.infer<typeof queryWorkspaceMembersSchema>;
