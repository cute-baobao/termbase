import { getCurrentUser } from '@/features/auth/action';
import { redirect } from 'next/navigation';

export default async function JoinWorkspacePage({ params }: { params: { token: string } }) {
  const { token } = params;
  const user = await getCurrentUser();
  if (!user) {
    redirect(`/sign-in?next=/workspaces/join/${token}`);
  }

  
}
