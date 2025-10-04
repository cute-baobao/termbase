import { CreateProject } from '@/features/projects/schemas';
import { db } from '@/lib/db';
import { Project } from '@prisma/client';

export class ProjectRepository  {
  static async createProject(project: CreateProject) {
    try {
      return await db.project.create({ data: project });
    } catch (error) {
      throw new Error('Create Project failed');
    }
  }
  static async queryProject(projectWhere: Partial<Project>) {
    return await db.project.findMany({
      where: projectWhere,
      orderBy: { createdAt: 'desc' },
    });
  }
}
