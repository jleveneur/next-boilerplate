import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { useNavigation } from '@/hooks/translations/use-navigation';

export default function Dashboard() {
  const t = useNavigation();

  const breadcrumbs = [{ label: t('dashboard') }];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="flex h-full flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </DashboardLayout>
  );
}
