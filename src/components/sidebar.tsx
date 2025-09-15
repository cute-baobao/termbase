import { WorkSpaceSwitcher } from '@/features/workspaces/components/workspaces-switcher';
import Image from 'next/image';
import Link from 'next/link';
import { DottedSeparator } from './dotted-separator';
import { Navigation } from './navigation';

const Sidebar = () => {
  return (
    <aside className="h-full w-full bg-neutral-100 p-4">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={302} height={40} priority />
      </Link>
      <DottedSeparator className="my-4" />
      <div className="min-h-10">
        <WorkSpaceSwitcher />
      </div>
      <DottedSeparator className="my-4" />
      <Navigation />
    </aside>
  );
};

export { Sidebar };
