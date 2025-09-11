import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { getCurrentUser } from '@/features/auth/action';
import { CreateWorkspaceForm } from '@/features/workspaces/components/create-workspace-form';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await getCurrentUser();
  const t = await getTranslations('IndexPage');
  if (!user) redirect('/sign-in');
  return (
    <div>
      {t('title')} <LanguageSwitcher />
      <CreateWorkspaceForm />
    </div>
  );
}
