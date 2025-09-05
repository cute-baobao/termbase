import { NextResponse } from "next/server";

// 通用响应类型
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

// 通用响应函数
export function responseSuccess<T>(
  data?: T,
  message = "ok",
  status = 200
): NextResponse {
  return NextResponse.json(
    { success: true, message, data },
    { status }
  );
}

export function responseError(
  message = "error",
  status = 400
): NextResponse {
  return NextResponse.json(
    { success: false, message, data: null },
    { status }
  );
}
