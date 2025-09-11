'use client';
import { DottedSeparator } from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useCreateWorkspace } from '../api/use-create-workspace';
import { CreateWorkspaceSchema, createWorkspaceSchema } from '../schemas';

interface CreateWorkspaceFormProps {
  onCancel?: () => void;
}

export const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {
  const t = useTranslations('WorkSpace.CreateWorkspaceForm');
  const form = useForm<CreateWorkspaceSchema>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const { mutate, isPending } = useCreateWorkspace();

  const onSubmit = (data: CreateWorkspaceSchema) => {
    mutate({ json: data });
  };

  return (
    <Card className="h-full w-full gap-0 border-none shadow-none">
      <CardHeader className="flex p-7">
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
              <Button type="button" variant="secondary" size="lg" onClick={onCancel}>
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

