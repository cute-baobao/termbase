import { getCurrentUser } from '@/features/auth/action';
import { WorkspaceService } from '@/server/service/workspace-service';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) redirect('/sign-in');

  const workspace = await WorkspaceService.queryWorkspaceByUserId(user.id);

  if (workspace.length === 0) return redirect('/workspaces/create');
  else redirect(`/workspaces/${workspace[0].id}`);
}
