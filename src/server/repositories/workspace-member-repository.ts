import { CreateWorkspaceMemberSchema } from '@/features/workspaces-member/schema';
import { db } from '@/lib/db';

export class WorkspaceMemberRepository {
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
}
