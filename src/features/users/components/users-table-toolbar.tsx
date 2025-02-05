'use client';

import { type Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface UsersTableToolbarProps<TData> {
  table: Table<TData>;
}

export function UsersTableToolbar<TData>({ table }: UsersTableToolbarProps<TData>) {
  const t = useTranslations('Users.components.UsersTableToolbar');
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between overflow-x-auto">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={t('searchByEmail')}
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            {t('clearFilters')}
            <X />
          </Button>
        )}
      </div>
      <Link href="/users/create">
        <Button variant="outline">{t('createUser')}</Button>
      </Link>
    </div>
  );
}
