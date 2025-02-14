'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFeatures } from '@/hooks/translations/use-features';
import { login, loginSchema } from '@/lib/auth';
import { cn } from '@/lib/utils';

type LoginFormProps = {
  className?: string;
};

const LoginForm = ({ className }: LoginFormProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const t = useFeatures('auth');

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    const { error } = await login(values);
    setIsLoading(false);

    setErrorMessage(error ?? null);
  }

  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader>
        <CardTitle className="text-2xl">{t('login.title')}</CardTitle>
        <CardDescription>{t('login.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('login.form.fields.email')}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="m@example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('login.form.fields.password')}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {errorMessage && <div className="text-destructive">{errorMessage}</div>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t('login.form.loading') : t('login.form.submit')}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export { LoginForm };
