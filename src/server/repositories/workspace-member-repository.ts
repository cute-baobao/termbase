import { CreateWorkspaceMemberSchema } from '@/features/members/schema';
import { db } from '@/lib/db';

export class WorkspaceMemberRepository {
  static async deleteWorkspaceMember(memberId: number) {
    try {
      return await db.workspaceMember.delete({
        where: {
          id: memberId,
        },
      });
    } catch (error) {
      console.log('[error deleteWorkspaceMember]', error instanceof Error ? error.message : error);
      return null;
    }
  }
  static async addMemberToWorkspace(schema: CreateWorkspaceMemberSchema) {
    try {
      return await db.workspaceMember.create({
        data: {
          ...schema,
        },
      });
    } catch (error) {
      console.log('[error addMemberToWorkspace]', error instanceof Error ? error.message : error);
      return null;
    }
  }

  static async memberInWorkspace(workspaceId: string, userId: string) {
    return await db.workspaceMember.findFirst({
      where: {
        workspaceId,
        userId,
      },
      include: {
        user: true,
      },
    });
  }

  static async checkInviteToken(token: string) {
    try {
      return await db.invitation.findFirst({
        where: {
          token: token,
          isUsed: false,
          expiresAt: {
            gt: new Date(),
          },
        },
      });
    } catch (error) {
      console.log('[error checkInviteToken]', error instanceof Error ? error.message : error);
      return null;
    }
  }

  static async addMemberToWorkspaceByInvite(schema: CreateWorkspaceMemberSchema, token: string) {
    try {
      return await db.$transaction(async (tx) => {
        const member = await tx.workspaceMember.create({
          data: {
            ...schema,
          },
        });
        await tx.invitation.update({
          where: {
            token,
          },
          data: {
            isUsed: true,
            usedAt: new Date(),
          },
        });
        return member;
      });
    } catch (error) {
      console.log('[error addMemberToWorkspaceByInvite]', error instanceof Error ? error.message : error);
      return null;
    }
  }

  static async getWorkspaceMembers(workspaceId: string) {
    return await db.workspaceMember.findMany({
      where: {
        workspaceId,
      },
      include: {
        user: true,
      },
    });
  }

  static async getWorkspaceMemberById(memberId: number) {
    return await db.workspaceMember.findUnique({
      where: {
        id: memberId,
      },
      include: {
        user: true,
      },
    });
  }
}
