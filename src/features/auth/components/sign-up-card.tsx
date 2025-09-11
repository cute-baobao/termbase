'use client';
import { DottedSeparator } from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useSignUp } from '../api/use-sign-up';
import { signUpSchema, SignUpSchema } from '../schemas';

const SignUpCard = () => {
  const t = useTranslations();
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  const { mutate, isPending } = useSignUp();

  const onSubmit = (data: SignUpSchema) => {
    mutate({ json: data });
  };
  return (
    <Card className="h-full w-full gap-0 border-none shadow-none md:w-[487px]">
      <CardHeader className="flex items-center justify-center p-7 text-center">
        <CardTitle className="text-2xl">{t('AuthPage.SignUpPage.welcome')}</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      autoComplete="username"
                      {...field}
                      type="text"
                      placeholder={t('AuthPage.SignUpPage.username-placeholder')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="email"
                      type="email"
                      placeholder={t('AuthPage.SignUpPage.email-placeholder')}
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
                      placeholder={t('AuthPage.SignUpPage.password-placeholder')}
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!form.formState.isValid || isPending} size="lg" className="w-full">
              {t('AuthPage.sign-up')}
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
          {t('AuthPage.SignUpPage.login-with-github')}
        </Button>
        <Button variant="secondary" size="lg" className="w-full">
          <FcGoogle className="mr-2 size-5" />
          {t('AuthPage.SignUpPage.login-with-google')}
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="flex items-center justify-center p-7">
        <p>
          {t('AuthPage.SignUpPage.already-have-account')}&nbsp;
          <Link href="/sign-in">
            <span className="text-blue-700">&nbsp;{t('AuthPage.sign-in')}</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export { SignUpCard };
