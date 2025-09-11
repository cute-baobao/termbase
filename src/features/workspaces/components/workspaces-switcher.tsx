'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetWorkspace } from '../api/use-get-workspace';
import { WorkSpacesAvatar } from './workspace-avatar';

import { RiAddCircleFill } from 'react-icons/ri';

export const WorkSpaceSwitcher = () => {
  const { data: workspaces } = useGetWorkspace();
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs text-neutral-500 uppercase font-semibold">Workspaces</p>
        <RiAddCircleFill className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-75" />
      </div>
      <Select>
        <SelectTrigger className="w-full bg-neutral-200 p-1 py-5 font-medium">
          <SelectValue placeholder="No workspace selected" />
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
