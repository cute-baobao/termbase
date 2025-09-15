'use client';
import { DottedSeparator } from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Itoast } from '@/lib/utils/Itoast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { joinWorkspaceSchema, JoinWorkspaceSchema } from '../schema';

interface JoinFormProps {
  onCancel?: () => void;
}

export const JoinForm = ({ onCancel }: JoinFormProps) => {
  const router = useRouter();
  const t = useTranslations('WorkSpace.JoinForm');
  const form = useForm<JoinWorkspaceSchema>({
    resolver: zodResolver(joinWorkspaceSchema),
    defaultValues: {
      inviteUrl: '',
    },
  });

  const onSubmit = (data: JoinWorkspaceSchema) => {
    const href = data.inviteUrl.split(window.location.origin)[1];
    if (!href) {
      Itoast({ message: t('invite-url-invalid'), success: false });
      form.reset();
      return;
    }
    router.push(`/workspaces${href}`);
    form.reset();
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
                name="inviteUrl"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{t('invite-url')}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder={t('invite-url-placeholder')} />
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
              <Button type="submit" disabled={!form.formState.isValid} size="lg">
                {t('button-create')}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
