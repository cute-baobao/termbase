import { CreateProject } from '@/features/projects/schemas';
import { Project, WorkspaceRole } from '@prisma/client';
import { ProjectRepository } from '../repositories/project-repository';
import { WorkspaceMemberService } from './workspace-member-service';

export class ProjectService {
  static async createProject(project: CreateProject, userId: string) {
    const userInWorkspace = await WorkspaceMemberService.memberInWorkspace(project.workspaceId, userId);
    if (!userInWorkspace) throw new Error('Unauthorized');
    if (userInWorkspace.role !== WorkspaceRole.ADMIN && userInWorkspace.role !== WorkspaceRole.OWNER)
      throw new Error('Only admin or owner can create project');
    return await ProjectRepository.createProject(project);
  }
  static async queryProject(projectWhere: Partial<Project>, userId?: string) {
    if (!userId || !projectWhere.workspaceId) return null;
    const userInWorkspace = await WorkspaceMemberService.memberInWorkspace(projectWhere.workspaceId, userId);
    // check user in workspace
    if (!userInWorkspace) return null;
    return await ProjectRepository.queryProject(projectWhere);
  }
}
