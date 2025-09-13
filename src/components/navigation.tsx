'use client';

import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { cn } from '@/lib/utils';
import { SettingsIcon, UserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill } from 'react-icons/go';

export const Navigation = () => {
  const pathname = usePathname();
  const { workspaceId } = useWorkspaceId();
  const t = useTranslations('Navigation');
  const routes = [
    {
      label: t('home'),
      path: '',
      icon: GoHome,
      activeIcon: GoHomeFill,
    },
    {
      label: t('dashboard'),
      path: '/dashboard',
      icon: GoCheckCircle,
      activeIcon: GoCheckCircleFill,
    },
    {
      label: t('members'),
      path: '/members',
      icon: UserIcon,
      activeIcon: UserIcon,
    },
    {
      label: t('settings'),
      path: '/setting',
      icon: SettingsIcon,
      activeIcon: SettingsIcon,
    },
  ];

  return (
    <nav>
      <ul>
        {routes.map((route) => {
          const fullhref = `/workspaces/${workspaceId}${route.path}`;
          const isActive = pathname === fullhref;
          const Icon = isActive ? route.activeIcon : route.icon;
          return (
            <li key={route.label}>
              <Link href={fullhref}>
                <div
                  className={cn(
                    'hover:text-primary flex items-center gap-2.5 rounded-md p-2.5 font-medium text-neutral-500 transition',
                    isActive && 'text-primary bg-white shadow-sm hover:opacity-100',
                  )}
                >
                  <Icon className="size-5 text-neutral-500" />
                  {route.label}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
