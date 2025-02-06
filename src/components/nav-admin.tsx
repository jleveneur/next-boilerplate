'use client';

import { Settings, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useNavigation } from '@/hooks/translations/use-navigation';
import { cn } from '@/lib/utils';

const NavAdmin = () => {
  const t = useNavigation();
  const pathname = usePathname();
  const { toggleSidebar, isMobile } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };

  const links = [
    { label: t('users.list'), href: '/users', icon: Users },
    {
      label: t('settings'),
      href: '/settings',
      icon: Settings,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t('admin')}</SidebarGroupLabel>
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

export { NavAdmin };
