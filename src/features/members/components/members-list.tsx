'use client';
import { DottedSeparator } from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { useConfirm } from '@/lib/hooks/use-confirm';
import { ArrowLeftIcon, MoreVerticalIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Fragment } from 'react';
import { useDeleteMember } from '../api/use-delete-member';
import { useGetMembers } from '../api/use-query-member';
import { MemberAvatar } from './member-avatar';

export const MemberList = () => {
  const { workspaceId } = useWorkspaceId();
  const t = useTranslations('MemberPage');
  const { data: members } = useGetMembers({ workspaceId });
  const { mutate: deleteMember, isPending: isDeletingMember } = useDeleteMember();

  const [ConfirmDialog, confirm] = useConfirm(
    t('remove-confirm-title'),
    t('remove-confirm-message'),
    'destructive',
  );

  const handleDeleteMember = async (memberId: string) => {
    const ok = await confirm();
    if (!ok) return;
    deleteMember({ param: { memberId } });
  };
  return (
    <Card className=" w-full border-none shadow-none">
      <ConfirmDialog />
      <CardHeader className="flex flex-row items-center space-y-0 gap-x-4">
        <Button asChild variant="secondary" size={'sm'}>
          <Link href={`/workspaces/${workspaceId}`}>
            <ArrowLeftIcon className="mr-2 size-4" />
            {t('back')}
          </Link>
        </Button>
        <CardTitle className="text-xl font-bold">{t('title')}</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        {members?.success &&
          members.data.map(({ user, id }, index) => (
            <Fragment key={id}>
              <div className="flex items-center gap-2">
                <MemberAvatar className="size-10" fallbackClassName="text-lg" name={user.username} />
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{user.username}</p>
                  <p className="text-muted-foreground text-xs">{user.email}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="ml-auto" variant="secondary" size="icon">
                      <MoreVerticalIcon className="text-muted-foreground size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom" align="end">
                    <DropdownMenuItem className="font-medium" onClick={() => {}} disabled={false}>
                      {t('set-admin')}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="font-medium" onClick={() => {}} disabled={false}>
                      {t('set-member')}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="font-medium text-amber-700"
                      onClick={() => handleDeleteMember(id.toString())}
                      disabled={isDeletingMember}
                    >
                      {t('remove-member', { name: user.username })}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {index < members.data.length - 1 && <Separator className="my-2.5" />}
            </Fragment>
          ))}
      </CardContent>
    </Card>
  );
};
