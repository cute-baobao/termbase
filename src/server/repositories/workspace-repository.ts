import { CreateWorkspaceSchema } from '@/features/workspaces/schemas';
import { db } from '@/lib/db';
import { Workspace } from '@prisma/client';

export class WorkspaceRepository {
  static async createWorkspace(data: CreateWorkspaceSchema) {
    return await db.workspace.create({
      data: {
        ...data,
        ownerId: data.ownerId!,
      },
    });
  }

  static async queryWorkspace(workspace: Partial<Pick<Workspace, 'id' | 'ownerId' | 'name'>>) {
    return await db.workspace.findMany({
      where: {
        ...workspace,
      },
    });
  }
}
