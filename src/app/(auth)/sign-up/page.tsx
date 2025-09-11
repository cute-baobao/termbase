import { getCurrentUser } from '@/features/auth/action';
import { SignUpCard } from '@/features/auth/components/sign-up-card';
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect('/');
  }
  return <SignUpCard />;
}
