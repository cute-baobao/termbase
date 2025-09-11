'use client';

import { cn } from '@/lib/utils';
import { SettingsIcon, UserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill } from 'react-icons/go';

export const Navigation = () => {
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
      path: '',
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
      path: '/settings',
      icon: SettingsIcon,
      activeIcon: SettingsIcon,
    },
  ];

  return (
    <nav>
      <ul>
        {routes.map((route) => {
          const isActive = false;
          const Icon = isActive ? route.activeIcon : route.icon;
          return (
            <li key={route.label}>
              <Link href={route.path}>
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
