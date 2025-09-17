import { client } from '@/lib/utils/rpc';
import { useQuery } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { QueryWorkspaceMembers } from '../schema';

type RequestType = InferRequestType<(typeof client.api.members)['$get']>;
type ResponseType = InferResponseType<(typeof client.api.members)['$get']>;

export const useGetMembers = ({ workspaceId }: QueryWorkspaceMembers) => {
  const query = useQuery<ResponseType, Error, RequestType>({
    queryKey: ['members', workspaceId],
    queryFn: async () => {
      const response = await client.api.members.$get({ query: { workspaceId } });
      if (!response.ok) throw new Error('Get Members failed');
      const data = await response.json();
      return data;
    },
  });
  return query;
};
