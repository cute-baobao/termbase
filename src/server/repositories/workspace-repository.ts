import { CreateWorkspaceSchema } from '@/features/workspaces/schemas';
import { db } from '@/lib/db';

export class WorkspaceRepository {
  static async createWorkspace(data: CreateWorkspaceSchema) {
    return await db.workspace.create({
      data: {
        ...data,
        ownerId: data.ownerId!,
      },
    });
  }
}

