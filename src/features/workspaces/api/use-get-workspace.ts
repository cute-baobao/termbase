import { client } from '@/lib/utils/rpc';
import { useQuery } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

type RequestType = InferRequestType<(typeof client.api.workspaces)['$get']>;
type ResponseType = InferResponseType<(typeof client.api.workspaces)['$get']>;

export const useGetWorkspace = () => {
  const query = useQuery<ResponseType, Error, RequestType>({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const response = await client.api.workspaces.$get();
      if (!response.ok) throw new Error('Get Workspaces failed');
      const data = await response.json();
      return data;
    },
  });
  return query;
};
