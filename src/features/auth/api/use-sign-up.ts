import { client } from "@/lib/utils/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type RequestType = InferRequestType<typeof client.api.auth.signUp.$post>;
type ResponseType = InferResponseType<typeof client.api.auth.signUp.$post>;

const useSignUp = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.signUp.$post({ json });
      return await response.json();
    },
  });

  return mutation;
};

export { useSignUp };

