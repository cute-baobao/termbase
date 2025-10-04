import { getCurrentUser } from '@/features/auth/action';
import { memberInWorkspace } from '@/features/members/actions';
import { InviteCode } from '@/features/members/components/invite-code';
import { MemberList } from '@/features/members/components/members-list';
import { redirect } from 'next/navigation';

interface WorkspaceMembersPageProps {
  params: Promise<{
    workspaceId: string;
  }>;
}

export default async function WorkspaceMembersPage({ params }: WorkspaceMembersPageProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/sign-in');
  }
  const workspaceId = (await params).workspaceId;
  const member = await memberInWorkspace(workspaceId, user.id);
  if (!member) {
    redirect('/');
  }

  return (
    <div className="w-full mx-auto">
      <InviteCode />
      <MemberList />
    </div>
  );
}
