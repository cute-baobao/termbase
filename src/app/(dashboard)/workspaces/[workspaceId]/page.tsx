import { getCurrentUser } from "@/features/auth/action";
import { redirect } from "next/navigation";

interface WorkspacePageProps {
  params: Promise<{ workspaceId: string }>;
}
export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/sign-in')
  }
  const { workspaceId } = await params;
  return <div>Workspace {workspaceId}</div>;
}
