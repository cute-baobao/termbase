// 通用响应类型
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

// 通用响应函数
export function responseSuccess<T>(data?: T, message = "ok"): ApiResponse<T> {
  return { success: true, message, data };
}

export function responseError(message = "error"): ApiResponse<null> {
  return { success: false, message, data: null };
}
