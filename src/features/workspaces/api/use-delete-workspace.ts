import { client } from '@/lib/utils/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type RequestType = InferRequestType<(typeof client.api.workspaces)[':workspaceId']['$delete']>;
type ResponseType = InferResponseType<(typeof client.api.workspaces)[':workspaceId']['$delete']>;

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.workspaces[':workspaceId'].$delete({ param });
      const responseJson = await response.json();
      if (!response.ok && !responseJson.success) {
        throw new Error(responseJson.message || 'Delete workspace failed');
      }
      return responseJson;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['workspaces'] });
        queryClient.invalidateQueries({ queryKey: ['workspace', data] });
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
