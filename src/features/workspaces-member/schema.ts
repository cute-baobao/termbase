import { WorkspaceRole } from '@prisma/client';
import z from 'zod';

const createWorkspaceMemberSchema = z.object({
  userId: z.string(),
  workspaceId: z.string(),
  role: z.enum(WorkspaceRole).default(WorkspaceRole.VIEWER).optional(),
});

export type CreateWorkspaceMemberSchema = z.infer<typeof createWorkspaceMemberSchema>;

