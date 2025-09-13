import { CreateWorkspaceMemberSchema } from '@/features/workspaces-member/schema';
import { WorkspaceMemberRepository } from '../repositories/workspace-member-repository';

export class WorkspaceMemberService {
  // Implementation details would go here
  static async addMemberToWorkspace(schema: CreateWorkspaceMemberSchema) {
    return await WorkspaceMemberRepository.addMemberToWorkspace(schema);
  }
  static async memberInWorkspace(workspaceId: string, userId: string) {
    return await WorkspaceMemberRepository.memberInWorkspace(workspaceId, userId);
  }
}
