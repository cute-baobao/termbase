import { AuthHeader } from '@/features/auth/components/auth-header';
import { Suspense } from 'react';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
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
