import { getCurrentUser } from '@/features/auth/action';
import { queryWorkspace } from '@/features/workspaces/actions';
import { EditWorkspaceForm } from '@/features/workspaces/components/edit-workspace-form';
import { redirect } from 'next/navigation';

interface WorkspaceSettingPageProps {
  params: Promise<{ workspaceId: string }>;
}

export default async function WorkspaceSettingPage({ params }: WorkspaceSettingPageProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/sign-in');
  }
  const { workspaceId } = await params;
  const workspace = await queryWorkspace({ id: workspaceId });
  if (!workspace || workspace.length === 0) {
    throw Error('Workspace not found');
  }

  return (
    <div className='w-full lg:max-w-xl'>
      <EditWorkspaceForm initialValue={workspace[0]} />
    </div>
  );
}
