import { client } from '@/lib/utils/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';
import { useUserStore } from '../store/use-user-store';

type RequestType = InferRequestType<typeof client.api.auth.signIn.$post>;
type ResponseType = InferResponseType<typeof client.api.auth.signIn.$post>;

export const useSignIn = () => {
  const { setUser } = useUserStore();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.signIn.$post({ json });
      const responseJson = await response.json();
      if (!response.ok) {
        throw new Error(responseJson.message || 'Sign in failed');
      }
      return responseJson;
    },
    onSuccess: (response) => {
      if (response.success && response.data) {
        setUser({
          ...response.data,
          createdAt: new Date(response.data.createdAt),
          lastLogin: new Date(response.data.lastLogin || 0),
          updatedAt: new Date(response.data.updatedAt),
        });
        // Invalidate workspaces query to refetch the latest data
        queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      }
      toast(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
