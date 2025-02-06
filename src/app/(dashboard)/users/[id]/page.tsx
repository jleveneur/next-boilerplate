import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { getUser, UpdateUserForm } from '@/features/users';

export default async function UpdateUser({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const t = await getTranslations();
  const { id } = await params;

  const {
    data: { user },
  } = await getUser(id);

  if (!user) notFound();

  const breadcrumbs = [
    { label: t('common.navigation.dashboard'), href: '/', isHiddenOnMobile: true },
    { label: t('common.navigation.users.list'), href: '/users' },
    { label: t('common.navigation.users.update') },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <UpdateUserForm user={user} />
    </DashboardLayout>
  );
}
