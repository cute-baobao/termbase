import { client } from '@/lib/utils/rpc';
import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type RequestType = InferRequestType<typeof client.api.auth.signUp.$post>;
type ResponseType = InferResponseType<typeof client.api.auth.signUp.$post>;

const useSignUp = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.signUp.$post({ json });
      const responseJson = await response.json();
      if (!response.ok) {
        throw new Error(responseJson.message || 'Sign up failed');
      }
      return responseJson;
    },
    onSuccess: (response) => {
      toast.success(response.message);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

export { useSignUp };

