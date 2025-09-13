'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetWorkspace } from '../api/use-get-workspace';
import { WorkSpacesAvatar } from './workspace-avatar';

import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { RiAddCircleFill } from 'react-icons/ri';
import { useCreateWorkspaceModal } from '../hooks/use-create-workspace-modal';
import { useWorkspaceId } from '../hooks/use-workspace-id';

export const WorkSpaceSwitcher = () => {
  const t = useTranslations('WorkSpace.WorkspaceSwitcher');
  const { data: workspaces } = useGetWorkspace();
  const router = useRouter();
  const { workspaceId } = useWorkspaceId()
  const { open } = useCreateWorkspaceModal();
 

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-neutral-500 uppercase">{t('title')}</p>
        <RiAddCircleFill onClick={open} className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-75" />
      </div>
      <Select value={workspaceId} onValueChange={(value) => router.push(`/workspaces/${value}`)}>
        <SelectTrigger className="w-full bg-neutral-200 p-1 py-5 font-medium">
          <SelectValue placeholder={t('switcher-placeholder')} />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.map((workspace) => (
            <SelectItem key={workspace.id} value={workspace.id}>
              <div className="flex items-center justify-start gap-3 font-medium">
                <WorkSpacesAvatar name={workspace.name} />
                <span className="truncate">{workspace.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
