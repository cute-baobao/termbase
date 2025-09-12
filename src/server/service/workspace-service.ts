import { CreateWorkspaceSchema } from '@/features/workspaces/schemas';
import { Workspace } from '@prisma/client';
import { WorkspaceRepository } from '../repositories/workspace-repository';

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
}

