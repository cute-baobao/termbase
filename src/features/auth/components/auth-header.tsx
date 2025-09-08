'use client';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AuthHeader = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const isSignIn = pathname === '/sign-in';
  return (
    <nav className="flex items-center justify-between">
      <Image src="/logo.svg" alt="Logo" width={40} height={40} />
      <Button asChild variant="secondary">
        <Link href={isSignIn ? '/sign-up' : '/sign-in'}>{isSignIn ? t('AuthPage.sign-up') : t('AuthPage.sign-in')}</Link>
      </Button>
    </nav>
  );
};

export { AuthHeader };

