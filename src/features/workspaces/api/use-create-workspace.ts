import { client } from '@/lib/utils/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type RequestType = InferRequestType<typeof client.api.workspaces.$post>;
type ResponseType = InferResponseType<typeof client.api.workspaces.$post>;

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.workspaces.$post({ json });
      const responseJson = await response.json();
      if (!response.ok) {
        throw new Error(responseJson.message || 'Create workspace failed');
      }
      return responseJson;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

