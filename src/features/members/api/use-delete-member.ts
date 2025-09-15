import { Itoast } from '@/lib/utils/Itoast';
import { client } from '@/lib/utils/rpc';
import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

type RequestType = InferRequestType<(typeof client.api.members)[':memberId']['$delete']>;
type ResponseType = InferResponseType<(typeof client.api.members)[':memberId']['$delete']>;

export const useDeleteMember = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ['members'],
    mutationFn: async ({ param }) => {
      const response = await client.api.members[':memberId'].$delete({ param });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Delete Member failed');
      return data;
    },
    onSuccess: (data) => {
      Itoast(data);
    },
    onError: (error) => {
      Itoast({ success: false, message: error.message });
    },
  });
  return mutation;
};
