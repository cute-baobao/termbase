'use client';
import { DottedSeparator } from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useConfirm } from '@/lib/hooks/use-confirm';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Workspace } from '@prisma/client';
import { ArrowLeftIcon, CopyIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useDeleteWorkspace } from '../api/use-delete-workspace';
import { useUpdateWorkspace } from '../api/use-update-workspace';
import { updateWorkspaceSchema, UpdateWorkspaceSchema } from '../schemas';

interface EditWorkspaceForm {
  initialValue: Workspace;
  onCancel?: () => void;
}

export const EditWorkspaceForm = ({ onCancel, initialValue }: EditWorkspaceForm) => {
  const router = useRouter();
  const t = useTranslations('WorkSpace.EditWorkspaceForm');
  const tCommon = useTranslations('Common');
  const form = useForm<UpdateWorkspaceSchema>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: {
      ...initialValue,
      description: initialValue.description ?? '',
    },
  });

  const { mutate, isPending } = useUpdateWorkspace();

  const onSubmit = (data: UpdateWorkspaceSchema) => {
    mutate(
      { json: data, param: { workspaceId: initialValue.id } },
      {
        onSuccess: (data) => {
          form.reset();
          if (data.success) {
            router.push(`/workspaces/${data.data.id}`);
          }
        },
      },
    );
  };

  const [DeleteDialog, confirmDelete] = useConfirm(
    t('delete-workspace-confirm-title'),
    t('delete-workspace-confirm-message'),
    'destructive',
  );

  const { mutate: deleteWorkspace, isPending: isDeleting } = useDeleteWorkspace();

  const handleDelete = async () => {
    const ok = await confirmDelete();
    if (!ok) return;
    deleteWorkspace(
      { param: { workspaceId: initialValue.id } },
      {
        onSuccess: () => {
          router.push('/');
        },
      },
    );
  };

  const disable = useMemo(() => isPending || isDeleting, [isPending, isDeleting]);
  const fullInviteLink = `${window.location.origin}/workspace/${initialValue.id}/join`;

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(fullInviteLink).then(() => {
      toast.success(tCommon('invite-link-copied'));
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <DeleteDialog />
      <Card className="h-full w-full gap-0 border-none shadow-none">
        <CardHeader className="flex flex-row items-center space-y-0 gap-x-4 px-7 py-4">
          <Button
            size="sm"
            variant="secondary"
            onClick={onCancel ? onCancel : () => router.push(`/workspaces/${initialValue.id}`)}
          >
            <ArrowLeftIcon className="mr-2 size-4" />
            {t('button-back')}
          </Button>
          <CardTitle className="text-xl font-bold">{initialValue.name}</CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="px-7 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>{t('filed-name')}</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder={t('filed-name-placeholder')} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>{t('filed-description')}</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder={t('filed-description-placeholder')} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <DottedSeparator className="py-7" />
              <div className="flex flex-wrap items-center justify-between">
                <Button type="button" variant="secondary" size="lg" onClick={onCancel} className={cn(!onCancel && 'invisible')}>
                  {t('button-cancel')}
                </Button>
                <Button type="submit" disabled={!form.formState.isValid || disable} size="lg">
                  {t('button-update')}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="h-full w-full gap-0 border-none shadow-none">
        <CardContent className="px-7 py-4">
          <div className="flex flex-col">
            <h3 className="font-bold">{t('danger-zone')}</h3>
            <p className="text-muted-foreground text-sm">{t('danger-zone-description')}</p>
            <Button onClick={handleDelete} className="mt-6 ml-auto w-fit" variant="destructive" size="sm" disabled={disable}>
              {t('delete-workspace')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
