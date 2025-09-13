import { CreateWorkspaceSchema, UpdateWorkspaceSchema } from '@/features/workspaces/schemas';
import { Workspace } from '@prisma/client';
import { WorkspaceRepository } from '../repositories/workspace-repository';
import { WorkspaceMemberService } from './workspace-member-service';

export class WorkspaceService {
  static async createWorkspace(data: CreateWorkspaceSchema) {
    return await WorkspaceRepository.createWorkspace(data);
  }

  static async queryWorkspace(workspace: Partial<Pick<Workspace, 'id' | 'ownerId' | 'name'>>) {
    return await WorkspaceRepository.queryWorkspace(workspace);
  }

  static async queryWorkspaceByUserId(userId: string) {
    return await WorkspaceRepository.queryWorkspaceByUserId(userId);
  }

  static async updateWorkspace(workspaceId: string, userId: string, data: UpdateWorkspaceSchema) {
    const member = await WorkspaceMemberService.memberInWorkspace(workspaceId, userId);
    if (!member) {
      throw new Error('not-member-of-workspace');
    }
    if (member.role !== 'OWNER' && member.role !== 'ADMIN' && member.user.globalRole !== 'ADMIN') {
      throw new Error('access-denied');
    }
    return await WorkspaceRepository.updateWorkspace(workspaceId, data);
  }

  static async deleteWorkspace(workspaceId: string, userId: string) {
    const member = await WorkspaceMemberService.memberInWorkspace(workspaceId, userId);
    if (!member) {
      throw new Error('not-member-of-workspace');
    }
    if (member.role !== 'OWNER' && member.user.globalRole !== 'ADMIN') {
      throw new Error('access-denied');
    }
    return await WorkspaceRepository.deleteWorkspace(workspaceId);
  }
}
