import { UserButton } from '@/features/auth/components/user-button';
import Image from 'next/image';
import Link from 'next/link';

interface StandlongLayoutProps {
  children: React.ReactNode;
}
export default function StandlongLayout({ children }: StandlongLayoutProps) {
  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex h-[73px] items-center justify-between">
          <Link href="/">
            <Image src="/logo.svg" alt="Termbase" width={302} height={40} priority />
          </Link>
          <UserButton />
        </nav>
        <div className="flex flex-col items-center justify-center py-4">{children}</div>
      </div>
    </main>
  );
}
