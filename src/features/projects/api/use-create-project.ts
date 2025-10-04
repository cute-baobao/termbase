import { client } from '@/lib/utils/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type RequestType = InferRequestType<typeof client.api.projects.$post>;
type ResponseType = InferResponseType<typeof client.api.projects.$post>;

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.projects.$post({ json });
      const responseJson = await response.json();
      if (!response.ok && !responseJson.success) {
        throw new Error(responseJson.message || 'Create project failed');
      }
      return responseJson;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
