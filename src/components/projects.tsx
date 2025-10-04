'use client';
import { useGetProjects } from '@/features/projects/api/use-get-project';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import { useCreateProjectModal } from '@/features/projects/hooks/use-create-project-modal';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiAddCircleFill } from 'react-icons/ri';

export function Projects() {
  const t = useTranslations('WorkSpace.Projects');
  const { workspaceId } = useWorkspaceId();
  const { data: projects } = useGetProjects({ workspaceId });
  const pathname = usePathname();
  const { open } = useCreateProjectModal();

  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-neutral-500 uppercase">{t('title')}</p>
        <RiAddCircleFill onClick={open} className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-75" />
      </div>
      {projects?.data.map((project) => {
        const href = `/workspaces/${workspaceId}/projects/${project.id}`;
        const isActive = pathname === `/workspaces/${workspaceId}/projects/${project.id}`;

        return (
          <Link href={href} key={project.id}>
            <div
              className={cn(
                'flex cursor-pointer items-center gap-2.5 rounded-md p-2.5 text-neutral-500 transition hover:opacity-75',
                isActive && 'text-primary bg-white shadow-sm hover:opacity-100',
              )}
            >
              <ProjectAvatar name={project.name} />
              <span className="truncate">{project.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
