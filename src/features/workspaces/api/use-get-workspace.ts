import { client } from '@/lib/utils/rpc';
import { useQuery } from '@tanstack/react-query';
import { InferResponseType } from 'hono';

type ResponseType = InferResponseType<(typeof client.api.workspaces)['$get']>;

export const useGetWorkspace = () => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const response = await client.api.workspaces.$get();
      if (!response.ok) {
        throw new Error('Failed to fetch workspace');
      }
      const data = await response.json();
      return data;
    },
  });
  return query;
};
