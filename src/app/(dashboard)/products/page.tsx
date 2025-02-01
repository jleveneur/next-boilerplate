import { useTranslations } from 'next-intl';
import React from 'react';

import { Header } from '@/components/header';

export default function Products() {
  const t = useTranslations('Products');

  const breadcrumbs = [
    { label: t('breadcrumb.dashboard'), href: '/', isHiddenOnMobile: true },
    { label: t('breadcrumb.products') },
  ];

  return (
    <React.Fragment>
      <Header breadcrumbs={breadcrumbs} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </React.Fragment>
  );
}
