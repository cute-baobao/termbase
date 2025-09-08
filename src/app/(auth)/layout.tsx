import { AuthHeader } from '@/features/auth/components/auth-header';
import { AUTH_COOKIE_NAME } from '@/features/auth/constance';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const cookie = await cookies();
  if (cookie.get(AUTH_COOKIE_NAME)) {
    // 以登陆不允许进入auth界面
    console.log(cookie.get(AUTH_COOKIE_NAME))
    redirect('/');
  }
  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="mx-auto max-w-screen-2xl p-4">
        <Suspense fallback={<div>Loading...</div>}>
          <AuthHeader />
          <div className="flex flex-col items-center justify-center pt-4 md:pt-14">{children}</div>
        </Suspense>
      </div>
    </main>
  );
}

