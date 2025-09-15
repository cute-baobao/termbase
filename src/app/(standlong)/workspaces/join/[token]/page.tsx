import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/features/auth/action';
import { addMemberToWorkspace } from '@/features/members/actions';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function JoinWorkspacePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const user = await getCurrentUser();
  if (!user) {
    redirect(`/sign-in?next=/workspaces/join/${token}`);
  }

  const response = await addMemberToWorkspace(token);

  if (response.success) {
    redirect(`/workspaces/${response.data?.workspaceId}`);
  } else {
    return (
      <div className="w-full">
        <div className="mx-auto flex items-center justify-center lg:max-w-xl">
          <div className="p-4 text-red-500">
            {response.message}
            <Button className="ml-2" asChild>
              <Link href={`/`}>Back</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
