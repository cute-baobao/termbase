'use server';

import { WorkspaceMemberService } from '@/server/service/workspace-member-service';
import { WorkspaceService } from '@/server/service/workspace-service';
import { Workspace } from '@prisma/client';
import { getCurrentUser } from '../auth/action';

export async function queryWorkspace(query: Partial<Pick<Workspace, 'id' | 'ownerId' | 'name'>>) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return null;
    }
    const member = await WorkspaceMemberService.memberInWorkspace(query.id!, user.id);
    if (!member) {
      return null;
    }
    return await WorkspaceService.queryWorkspace(query);
  } catch {
    return null;
  }
}
