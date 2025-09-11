import { client } from '@/lib/utils/rpc';
import { useQuery } from '@tanstack/react-query';

export const useGetWorkspace = () => {
  const query = useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const response = await client.api.workspaces.$get();
      if (!response.ok) throw new Error('Get Workspaces failed');
      const data = await response.json();
      return data.data;
    },
  });
  return query;
};
