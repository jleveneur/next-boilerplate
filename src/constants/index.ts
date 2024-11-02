import { LayoutDashboard, Package, Users } from 'lucide-react';

export const MAIN_LINKS = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Users', href: '/users', icon: Users },
  { label: 'Products', href: '/products', icon: Package },
] as const;
