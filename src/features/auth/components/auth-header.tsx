'use client';
import { Button } from '@/components/ui/button';
import { safeRedirect } from '@/lib/utils/safe-redirect';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const AuthHeader = () => {
  const t = useTranslations();

  // 避免 SSR/客户端首次渲染不一致导致的 hydration mismatch：
  // 初始渲染不依赖 pathname/searchParams，mounted 后再基于实际值计算
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  const [href, setHref] = useState('/sign-in');
  const [isSignIn, setIsSignIn] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const currentIsSignIn = pathname === '/sign-in';
    setIsSignIn(currentIsSignIn);

    const nextParam = searchParams?.get('next') ?? null;
    const next = safeRedirect(nextParam);

    const computedHref = currentIsSignIn
      ? next
        ? `/sign-up?next=${encodeURIComponent(next)}`
        : '/sign-up'
      : next
        ? `/sign-in?next=${encodeURIComponent(next)}`
        : '/sign-in';

    setHref(computedHref);
  }, [mounted, pathname, searchParams]);

  // 服务端与客户端首次渲染保持一致：默认链接为 /sign-in
  return (
    <nav className="flex items-center justify-between">
      <Image src="/logo.svg" alt="Logo" width={40} height={40} />
      <Button asChild variant="secondary">
        {/* 在未挂载前使用默认 href 避免 hydration mismatch；挂载后会更新 */}
        <Link href={href}>{isSignIn ? t('AuthPage.sign-up') : t('AuthPage.sign-in')}</Link>
      </Button>
    </nav>
  );
};

export { AuthHeader };