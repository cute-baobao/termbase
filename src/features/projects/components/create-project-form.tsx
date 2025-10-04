'use client';
import { DottedSeparator } from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useCreateProject } from '../api/use-create-project';
import { CreateProject, createProjectSchema } from '../schemas';

interface CreateProjectFormProps {
  onCancel?: () => void;
}

export const CreateProjectForm = ({ onCancel }: CreateProjectFormProps) => {
  const router = useRouter();
  const t = useTranslations('WorkSpace.CreateProjectForm');
  const { workspaceId } = useWorkspaceId();
  const form = useForm<CreateProject>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      workspaceId: workspaceId || '',
    },
  });

  const { mutate, isPending } = useCreateProject();

  const onSubmit = (data: CreateProject) => {
    mutate(
      { json: data },
      {
        onSuccess: (data) => {
          form.reset();
          if (data.success) {
            router.push(`/workspaces/${workspaceId}/projects/${data.data.id}`);
          }
        },
      },
    );
  };

  return (
    <Card className="h-full w-full gap-0 border-none shadow-none">
      <CardHeader className="flex items-center justify-between p-7">
        <CardTitle className="text-xl font-bold">{t('title')}</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
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
            </div>
            <DottedSeparator className="py-7" />
            <div className="flex flex-wrap items-center justify-between">
              <Button type="button" variant="secondary" size="lg" onClick={onCancel} className={cn(!onCancel && 'invisible')}>
                {t('button-cancel')}
              </Button>
              <Button type="submit" disabled={!form.formState.isValid || isPending} size="lg">
                {t('button-create')}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
