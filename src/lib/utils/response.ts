// 通用响应类型
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

interface Response<T = unknown> {
  data?: T;
  message?: string;
  status?: number;
}

export const success = <T>({
  data,
  message = "ok",
  status = 200,
}: Response<T>) => {
  return [
    {
      success: true,
      message,
      data,
    },
    status,
  ];
};

export const fail = ({
  message,
  status = 400,
}: {
  message: string;
  status?: number;
}) => {
  return [
    {
      success: false,
      message,
    },
    status,
  ];
};
