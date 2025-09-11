import z from 'zod';

export const createWorkspaceSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  ownerId: z.string().optional(),
});

export type createWorkspaceSchema = z.infer<typeof createWorkspaceSchema>;

