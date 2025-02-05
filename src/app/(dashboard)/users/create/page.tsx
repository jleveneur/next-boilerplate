import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { CreateUserForm } from '@/features/users';

export default function CreateUser() {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/', isHiddenOnMobile: true },
    { label: 'Users', href: '/users' },
    { label: 'Create' },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <CreateUserForm />
    </DashboardLayout>
  );
}
