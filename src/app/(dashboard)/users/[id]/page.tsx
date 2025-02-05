import { notFound } from 'next/navigation';

import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { getUser, UpdateUserForm } from '@/features/users';

export default async function UpdateUser({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const {
    data: { user },
  } = await getUser(id);

  if (!user) notFound();

  const breadcrumbs = [
    { label: 'Dashboard', href: '/', isHiddenOnMobile: true },
    { label: 'Users', href: '/users' },
    { label: 'Update' },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <UpdateUserForm user={user} />
    </DashboardLayout>
  );
}
