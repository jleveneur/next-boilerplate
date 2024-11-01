'use client';

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

import { MAIN_LINKS } from '@/constants';

import { useIsMobile } from '@/hooks/use-mobile';

import { cn } from '@/lib/utils';

export function NavMain() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  const handleLinkClick = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Application</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {MAIN_LINKS.map((item) => (
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
}
