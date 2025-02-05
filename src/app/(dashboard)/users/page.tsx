import { getTranslations } from 'next-intl/server';

import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { getUsers, UsersTable } from '@/features/users';

export default async function Users() {
  const t = await getTranslations('Users');
  const { data } = await getUsers();

  const breadcrumbs = [
    { label: t('breadcrumb.dashboard'), href: '/', isHiddenOnMobile: true },
    { label: t('breadcrumb.users') },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs} title={t('title')} description={t('description')}>
      <UsersTable data={data.users} />
    </DashboardLayout>
  );
}
