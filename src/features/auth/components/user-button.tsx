'use client';

import { DottedSeparator } from '@/components/dotted-separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useUserStore } from '../store/use-user-store';

const UserButton = () => {
  const t = useTranslations();
  const router = useRouter();
  const { user, logOut } = useUserStore();
  if (!user) return null;
  const { email, username } = user;
  const avatarFallback = username.charAt(0).toUpperCase();

  const UserAvatar = () => {
    return (
      <Avatar className="size-10 border border-neutral-300 transition hover:opacity-75">
        <AvatarFallback className="flex items-center justify-center bg-neutral-200 font-medium text-neutral-500">
          {avatarFallback}
        </AvatarFallback>
      </Avatar>
    );
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative outline-none">
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom" className="w-60" sideOffset={10}>
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <UserAvatar />
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">{username}</p>
            <p className="text-xs text-neutral-500">{email}</p>
          </div>
        </div>
        <DottedSeparator className="mb-1" />
        <DropdownMenuItem
          onClick={() => logOut(() => router.push('/sign-in'))}
          className="flex h-10 cursor-pointer items-center justify-center font-medium text-amber-700"
        >
          <LogOut className="mr-2 size-4" />
          {t('log-out')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { UserButton };

