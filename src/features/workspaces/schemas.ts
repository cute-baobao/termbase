import z from 'zod';

export const createWorkspaceSchema = z.object({
  name: z.string().min(1, 'Required').max(100, 'Must be 100 characters or less'),
  description: z.string().optional(),
  ownerId: z.string().optional(),
});

export const updateWorkspaceSchema = z.object({
  name: z.string().min(1, 'Required').max(100, 'Must be 100 characters or less').optional(),
  description: z.string().optional(),
  isActive: z.boolean().default(true).optional(),
});

export type CreateWorkspaceSchema = z.infer<typeof createWorkspaceSchema>;
export type UpdateWorkspaceSchema = z.infer<typeof updateWorkspaceSchema>;
