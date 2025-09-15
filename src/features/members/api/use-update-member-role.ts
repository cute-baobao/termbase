import { Itoast } from '@/lib/utils/Itoast';
import { client } from '@/lib/utils/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

type RequestType = InferRequestType<(typeof client.api.members)[':memberId']['$patch']>;
type ResponseType = InferResponseType<(typeof client.api.members)[':memberId']['$patch']>;

export const useUpdateMemberRole = () => {
  const queryClient = useQueryClient();
  
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ['update-member-role'],
    mutationFn: async ({ param, json }) => {
      const response = await client.api.members[':memberId'].$patch({ param, json });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Update Member failed');
      return data;
    },
    onSuccess: (data) => {
      Itoast(data);
      // 使缓存失效，刷新成员列表
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
    onError: (error) => {
      Itoast({ success: false, message: error.message });
    },
  });
  return mutation;
};
