import { toast } from "sonner";

interface ItoastParams {
  success?: boolean,
  message: string,
}
export const Itoast = ({ success, message }: ItoastParams) => {
  if (success === true) {
    toast.success(message);
  } else {
    toast.error(message);
  }
}