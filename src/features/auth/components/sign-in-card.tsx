'use client';
import { DottedSeparator } from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';

import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useSignIn } from '../api/use-sign-in';
import { signInSchema, SignInSchema } from '../schemas';

const SignInCard = () => {
  const router = useRouter();
  const t = useTranslations();
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { mutate, isPending } = useSignIn();

  const onSubmit = (data: SignInSchema) => {
    mutate({ json: data });
  };
  return (
    <Card className="h-full w-full gap-0 border-none shadow-none md:w-[487px]">
      <CardHeader className="flex items-center justify-center p-7 text-center">
        <CardTitle className="text-2xl">{t('AuthPage.SignInPage.welcomeBack')}</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder={t('AuthPage.SignInPage.email-placeholder')}
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder={t('AuthPage.SignInPage.password-placeholder')}
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!form.formState.isValid || isPending} type="submit" size="lg" className="w-full">
              {t('AuthPage.sign-in')}
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="flex flex-col space-y-4 p-7">
        <Button variant="secondary" size="lg" className="w-full">
          <FaGithub className="mr-2 size-5" />
          {t('AuthPage.SignInPage.login-with-github')}
        </Button>
        <Button variant="secondary" size="lg" className="w-full">
          <FcGoogle className="mr-2 size-5" />
          {t('AuthPage.SignInPage.login-with-google')}
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="flex items-center justify-center p-7">
        <p>
          {t('AuthPage.SignInPage.dont-have-account')}&nbsp;
          <Link href="/sign-up">
            <span className="text-blue-700">&nbsp;{t('AuthPage.sign-up')}</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export { SignInCard };

