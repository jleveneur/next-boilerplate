'use client';

import { LayoutDashboard, Package, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const NavMain = () => {
  const t = useTranslations('NavMain');
  const pathname = usePathname();
  const { toggleSidebar, isMobile } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };

  const links = [
    { label: t('dashboard'), href: '/', icon: LayoutDashboard },
    { label: t('users'), href: '/users', icon: Users },
    { label: t('products'), href: '/products', icon: Package },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t('label')}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {links.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild>
                <Link
                  href={item.href}
                  className={cn({
                    'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100':
                      pathname === item.href,
                  })}
                  onClick={handleLinkClick}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export { NavMain };
