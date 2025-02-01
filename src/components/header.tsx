import React from 'react';

import { LocaleSwitcher } from './locale-switcher';
import { ModeToggle } from './mode-toggle';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import { Separator } from './ui/separator';
import { SidebarTrigger } from './ui/sidebar';

export type Breadcrumb = {
  href?: string;
  label: string;
  isHiddenOnMobile?: boolean;
};

type HeaderProps = {
  breadcrumbs: Breadcrumb[];
};

const Header = ({ breadcrumbs }: HeaderProps) => {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem className={breadcrumb.isHiddenOnMobile ? 'hidden md:block' : ''}>
                  {breadcrumb.href ? (
                    <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.label}</BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator
                    className={breadcrumb.isHiddenOnMobile ? 'hidden md:block' : ''}
                  />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <ModeToggle className="ml-auto" />
        <LocaleSwitcher />
      </div>
    </header>
  );
};

export { Header };
