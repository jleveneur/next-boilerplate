'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
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
import { useButtons } from '@/hooks/translations/use-buttons';
import { useFeatures } from '@/hooks/translations/use-features';
import { cn } from '@/lib/utils';

import { updateUser } from '../actions';
import { UpdateUserFormData, updateUserSchema } from '../validation';

type UpdateUserFormProps = {
  user: User;
  className?: string;
};

const UpdateUserForm = ({ user, className }: UpdateUserFormProps) => {
  const [isSubmitting, startTransition] = useTransition();
  const t = useFeatures('users');
  const buttons = useButtons();
  const router = useRouter();

  const form = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      fullName: user.user_metadata.full_name,
      email: user.email,
      role: user.user_metadata.role,
    },
  });

  const onSubmit = async (values: UpdateUserFormData) => {
    startTransition(async () => {
      const { success, message } = await updateUser(user.id, values);

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
      <h1 className="mb-4 text-3xl font-semibold">{t('update.title')}</h1>
      <p className="text-muted-foreground">{t('update.description')}</p>
      <Separator className="my-6" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('update.form.fields.full_name')}</FormLabel>
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
                <FormLabel>{t('update.form.fields.email')}</FormLabel>
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
                <FormLabel>{t('update.form.fields.role')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="user">{t('common.roles.user')}</SelectItem>
                      <SelectItem value="admin">{t('common.roles.admin')}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? buttons('submitting') : buttons('submit')}
          </Button>
          <Button variant="outline" className="w-full" type="button" onClick={router.back}>
            {buttons('cancel')}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export { UpdateUserForm };
