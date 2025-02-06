import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { CreateUserForm } from '@/features/users';
import { useNavigation } from '@/hooks/translations/use-navigation';

export default function CreateUser() {
  const t = useNavigation();

  const breadcrumbs = [
    { label: t('dashboard'), href: '/', isHiddenOnMobile: true },
    { label: t('users.list'), href: '/users' },
    { label: t('users.create') },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <CreateUserForm />
    </DashboardLayout>
  );
}
