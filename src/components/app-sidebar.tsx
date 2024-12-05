import { redirect } from 'next/navigation';
import * as React from 'react';

import { currentUser } from '@clerk/nextjs/server';

import { NavProjects } from '@/components/nav-projects';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { TeamSwitcher } from './team-switcher';

const AppSidebar = async (props: React.ComponentProps<typeof Sidebar>) => {
  const clerkUser = await currentUser();

  if (!clerkUser) redirect('/sign-in');

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavProjects />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: clerkUser.fullName!,
            email: clerkUser.emailAddresses[0].emailAddress,
            avatar: clerkUser.imageUrl,
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
