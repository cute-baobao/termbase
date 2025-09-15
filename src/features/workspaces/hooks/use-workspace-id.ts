import { useParams } from 'next/navigation';
import { useMemo } from 'react';

export const useWorkspaceId = () => {
  const params = useParams();
  const workspaceId = useMemo(() => params.workspaceId as string, [params]);
  return { workspaceId };
};
