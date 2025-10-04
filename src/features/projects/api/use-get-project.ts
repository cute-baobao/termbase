import { client } from '@/lib/utils/rpc';
import { useQuery } from '@tanstack/react-query';
import { InferResponseType } from 'hono';
import { QueryProject } from '../schemas';

type ResponseType = InferResponseType<typeof client.api.projects.$get>;

export const useGetProjects = ({ workspaceId }: QueryProject) => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ['projects', workspaceId],
    queryFn: async () => {
      const response = await client.api.projects.$get({ query: { workspaceId } });
      if (!response.ok) throw new Error('Get Projects failed');
      const data = await response.json();
      return data;
    },
  });
  return query;
};
