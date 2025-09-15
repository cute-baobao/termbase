import { Itoast } from '@/lib/utils/Itoast';
import { client } from '@/lib/utils/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

type RequestType = InferRequestType<(typeof client.api.workspaces)[':workspaceId']['$patch']>;
type ResponseType = InferResponseType<(typeof client.api.workspaces)[':workspaceId']['$patch']>;

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.workspaces[':workspaceId']['$patch']({ json, param });
      const responseJson = await response.json();
      if (!response.ok && !responseJson.success) {
        throw new Error(responseJson.message || 'Create workspace failed');
      }
      return responseJson;
    },
    onSuccess: (data) => {
      Itoast(data);
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['workspaces'] });
        queryClient.invalidateQueries({ queryKey: ['workspace', data.data.id] });
      }
    },
    onError: (error) => {
      Itoast({ message: error.message });
    },
  });

  return mutation;
};
