import { getCurrentUser } from '@/features/auth/action';
import { memberInWorkspace } from '@/features/members/actions';
import { InviteCode } from '@/features/members/components/invite-code';
import { redirect } from 'next/navigation';

interface WorkspaceMembersPageProps {
  params: {
    workspaceId: string;
  };
}

export default async function WorkspaceMembersPage({ params }: WorkspaceMembersPageProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/sign-in');
  }
  const workspaceId = params.workspaceId;
  // Check if the user is a member of the workspace
  const member = await memberInWorkspace(workspaceId, user.id);
  if (!member) {
    redirect('/');
  }

  return (
    <div className="w-full">
      <InviteCode />
    </div>
  );
}
