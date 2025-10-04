import { z } from 'zod';

export const queryProjectSchema = z.object({
  workspaceId: z.string().min(1, 'workspaceId is required'),
});

export const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  workspaceId: z.string().min(1, 'workspaceId is required'),
});

export type QueryProject = z.infer<typeof queryProjectSchema>;
export type CreateProject = z.infer<typeof createProjectSchema>;
