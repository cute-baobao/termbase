import { CreateWorkspaceSchema, UpdateWorkspaceSchema } from '@/features/workspaces/schemas';
import { db } from '@/lib/db';
import { Workspace } from '@prisma/client';

export class WorkspaceRepository {
  static async createWorkspace(data: CreateWorkspaceSchema) {
    return await db.$transaction(async (tx) => {
      const workspace = await tx.workspace.create({
        data: {
          ...data,
          ownerId: data.ownerId!,
        },
      });

      await tx.workspaceMember.create({
        data: {
          workspaceId: workspace.id,
          userId: data.ownerId!,
          role: 'OWNER',
        },
      });

      return workspace;
    });
  }

  static async queryWorkspace(workspace: Partial<Pick<Workspace, 'id' | 'ownerId' | 'name'>>) {
    return await db.workspace.findMany({
      where: {
        ...workspace,
      },
    });
  }

  static async queryWorkspaceByUserId(userId: string) {
    return await db.workspace.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  static async updateWorkspace(workspaceId: string, data: UpdateWorkspaceSchema) {
    return await db.workspace.update({
      where: {
        id: workspaceId,
      },
      data,
    });
  }

  static async deleteWorkspace(workspaceId: string) {
    return await db.$transaction(async (tx) => {
      await tx.workspaceMember.deleteMany({
        where: {
          workspaceId,
        },
      });

      await tx.workspace.delete({
        where: {
          id: workspaceId,
        },
      });
    });
  }
}
