import { getTranslations } from 'next-intl/server';

import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { getUsers, UsersTable } from '@/features/users';

export default async function Users() {
  const t = await getTranslations();
  const { data } = await getUsers();

  const breadcrumbs = [
    { label: t('common.navigation.dashboard'), href: '/', isHiddenOnMobile: true },
    { label: t('common.navigation.users.list') },
  ];

  return (
    <DashboardLayout
      breadcrumbs={breadcrumbs}
      title={t('features.users.list.title')}
      description={t('features.users.list.description')}
    >
      <UsersTable data={data.users} />
    </DashboardLayout>
  );
}
