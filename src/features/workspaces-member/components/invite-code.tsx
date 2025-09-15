'use client';
import { DottedSeparator } from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGenerateInviteLink } from '@/features/workspaces/api/use-generate-invite-link';
import { useConfirm } from '@/lib/hooks/use-confirm';
import { Itoast } from '@/lib/utils/Itoast';
import { zodResolver } from '@hookform/resolvers/zod';
import { WorkspaceRole } from '@prisma/client';
import { CopyIcon, LinkIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { inviteWorkspaceMemberSchema, InviteWorkspaceMemberSchema } from '../schema';

export function InviteCode() {
  const t = useTranslations('WorkSpace.InviteCode');
  const { workspaceId } = useParams();
  const inviteButton = useRef<HTMLButtonElement>(null);
  const [inviteLink, setInviteLink] = useState<string>('');
  const form = useForm<InviteWorkspaceMemberSchema>({
    resolver: zodResolver(inviteWorkspaceMemberSchema),
    defaultValues: {
      email: '',
      role: undefined,
    },
  });

  const { mutate: generateInviteLink, isPending } = useGenerateInviteLink();
  const [GenerateConfirm, confirm] = useConfirm(t('generate-confirm-title'), t('generate-confirm-message'));

  const onSubmit = (data: InviteWorkspaceMemberSchema) => {
    generateInviteLink(
      { param: { workspaceId: workspaceId as string }, json: data },
      {
        onSuccess: async (data) => {
          Itoast(data);
          if (data.success) {
            setInviteLink(`${window.location.origin}/join/${data.data.token}`);
            await confirm();
            form.reset();
          }
        },
      },
    );
  };

  const CopyInviteLink = () => {
    const handleCopy = async () => {
      if (!inviteLink) return;
      await navigator.clipboard.writeText(inviteLink);
      Itoast({ success: true, message: t('copy-success') });
    };

    return (
      <div className="mt-4">
        <div className="flex items-center gap-x-2">
          <Input disabled value={inviteLink} />
          <Button onClick={handleCopy} variant="secondary" className="size-9">
            <CopyIcon className="size-5" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <GenerateConfirm>{inviteLink && <CopyInviteLink />} </GenerateConfirm>
      <Card className="w-full gap-0 border-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 gap-x-4 px-7 py-4">
          <div>
            <CardTitle className="text-xl font-bold">{t('title')}</CardTitle>
            <CardDescription className="text-muted-foreground">{t('description')}</CardDescription>
          </div>
          <Button
            onClick={() => inviteButton.current?.click()}
            disabled={isPending || !form.formState.isValid}
            size="sm"
            variant="secondary"
          >
            <LinkIcon className="mr-2 size-4" />
            {t('invite-link-button')}
          </Button>
        </CardHeader>
        <DottedSeparator className="px-7 py-2" />
        <CardContent className="px-7 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4 lg:flex-row">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex-1">
                        <FormLabel>{t('email-label')}</FormLabel>
                        <FormControl>
                          <Input className="p-1 py-5" {...field} placeholder={t('email-placeholder')} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex-1">
                        <FormLabel>{t('role-label')}</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="utral-200 w-full p-1 py-5 font-medium">
                              <SelectValue placeholder={t('role-placeholder')} />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.values(WorkspaceRole)
                                ?.filter((role) => role !== 'OWNER')
                                .map((role) => (
                                  <SelectItem key={role} value={role}>
                                    <div className="flex items-center justify-start gap-3 font-medium">
                                      <span className="truncate">{role}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <button type="submit" ref={inviteButton} className="hidden" />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
