'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import { createUser } from '../actions';
import { CreateUserFormData, createUserSchema } from '../validation';

type CreateUserFormProps = {
  className?: string;
};

const CreateUserForm = ({ className }: CreateUserFormProps) => {
  const [isSubmitting, startTransition] = useTransition();
  const t = useTranslations('Users.components.CreateUserForm');
  const router = useRouter();

  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      fullName: '',
      email: '',
      role: 'user',
      password: '',
    },
  });

  const onSubmit = async (values: CreateUserFormData) => {
    startTransition(async () => {
      const { success, message } = await createUser(values);

      if (success) {
        toast.success(message);
        router.push('/users');
      } else {
        toast.error(message);
      }
    });
  };

  return (
    <div className={cn('mx-auto max-w-2xl', className)}>
      <h1 className="mb-4 text-3xl font-semibold">{t('title')}</h1>
      <p className="text-muted-foreground">{t('description')}</p>
      <Separator className="my-6" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('fields.fullName')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Doe" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('fields.email')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="m@example.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('fields.role')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="user">{t('user')}</SelectItem>
                      <SelectItem value="admin">{t('admin')}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('fields.password')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? t('submitting') : t('submit')}
          </Button>
          <Button variant="outline" className="w-full" type="button" onClick={router.back}>
            {t('cancel')}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export { CreateUserForm };
