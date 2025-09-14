'use server';

import { WorkspaceMemberService } from '@/server/service/workspace-member-service';
import { getTranslations } from 'next-intl/server';
import { getCurrentUser } from '../auth/action';

export async function memberInWorkspace(workspaceId: string, userId: string) {
  try {
    return await WorkspaceMemberService.memberInWorkspace(workspaceId, userId);
  } catch {
    return null;
  }
}

export async function addMemberToWorkspace(token: string) {
  const t = await getTranslations('API.WorkspaceMember');

  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, message: t('join-failed') };
    }

    const result = await WorkspaceMemberService.checkInviteToken(token);
    if (!result) {
      return { success: false, message: t('invalid-token') };
    }

    const { workspaceId, role } = result;
    const isMember = await memberInWorkspace(workspaceId, user.id);
    if (isMember) {
      return { success: false, message: t('already-member') };
    }

    const member = await WorkspaceMemberService.addMemberToWorkspace({
      userId: user.id,
      workspaceId,
      role,
    });

    return { success: true, message: t('join-success'), data: member };
  } catch (error) {
    console.error('Error adding member to workspace:', error);
    return { success: false, message: t('join-failed') };
  }
}
