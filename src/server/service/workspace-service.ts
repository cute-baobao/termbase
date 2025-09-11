import { CreateWorkspaceSchema } from '@/features/workspaces/schemas';
import { WorkspaceRepository } from '../repositories/workspace-repository';

export class WorkspaceService {
  static async createWorkspace(data: CreateWorkspaceSchema) {
    return await WorkspaceRepository.createWorkspace(data);
  }
}

