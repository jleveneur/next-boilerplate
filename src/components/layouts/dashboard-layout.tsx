import { AppSidebar } from '../app-sidebar';
import { Header } from '../header';
import { SidebarInset, SidebarProvider } from '../ui/sidebar';

type DashboardLayoutProps = {
  children: React.ReactNode;
  breadcrumbs: Array<{ label: string; href?: string; isHiddenOnMobile?: boolean }>;
  title?: string;
  description?: string;
};

/**
 * DashboardLayout component
 *
 * This component provides the layout for the dashboard pages. It includes:
 * - A sidebar provided by the SidebarProvider and AppSidebar components
 * - A header with breadcrumbs
 * - An optional title and description
 * - The main content area for the children components
 *
 * @param {DashboardLayoutProps} props - The properties for the DashboardLayout component
 */
const DashboardLayout = ({ children, breadcrumbs, title, description }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header breadcrumbs={breadcrumbs} />
        <main className="flex-1 p-6">
          {title && <h1 className="mb-4 text-3xl font-semibold">{title}</h1>}
          {description && <p className="mb-6 text-gray-600">{description}</p>}
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export { DashboardLayout };
