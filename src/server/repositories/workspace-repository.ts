import { InviteWorkspaceMemberSchema } from '@/features/members/schema';
import { CreateWorkspaceSchema, UpdateWorkspaceSchema } from '@/features/workspaces/schemas';
import { db } from '@/lib/db';
import { Workspace } from '@prisma/client';
import { randomBytes } from 'crypto';

export class WorkspaceRepository {
  static async generateInviteLink(workspaceId: string, userId: string, inviteData: InviteWorkspaceMemberSchema) {
    const token = randomBytes(16).toString('hex');
    const expiresAt = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
    return await db.invitation.create({
      data: {
        workspaceId: workspaceId,
        invitedBy: userId,
        email: inviteData.email,
        role: inviteData.role,
        expiresAt,
        token,
      },
    });
  }
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
