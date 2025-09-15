import { CreateWorkspaceMemberSchema } from '@/features/members/schema';
import { WorkspaceMemberRepository } from '../repositories/workspace-member-repository';

export class WorkspaceMemberService {
  static async deleteWorkspaceMember(memberId: number, userId: string) {
    const member = await WorkspaceMemberRepository.getWorkspaceMemberById(memberId);
    if (!member) {
      throw new Error('member-not-found');
    }

    const user = await WorkspaceMemberRepository.memberInWorkspace(member.workspaceId, userId);
    if (!user || (user.role !== 'OWNER' && user.role !== 'ADMIN')) {
      throw new Error('no-permission');
    }
    return await WorkspaceMemberRepository.deleteWorkspaceMember(memberId);
  }
  static async getWorkspaceMembers(workspaceId: string) {
    return await WorkspaceMemberRepository.getWorkspaceMembers(workspaceId);
  }

  static async addMemberToWorkspace(schema: CreateWorkspaceMemberSchema) {
    return await WorkspaceMemberRepository.addMemberToWorkspace(schema);
  }
  static async memberInWorkspace(workspaceId: string, userId: string) {
    return await WorkspaceMemberRepository.memberInWorkspace(workspaceId, userId);
  }

  static async checkInviteToken(token: string) {
    return await WorkspaceMemberRepository.checkInviteToken(token);
  }

  static async addMemberToWorkspaceByInvite(schema: CreateWorkspaceMemberSchema, token: string) {
    return await WorkspaceMemberRepository.addMemberToWorkspaceByInvite(schema, token);
  }
}
