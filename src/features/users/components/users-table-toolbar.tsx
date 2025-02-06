'use client';

import { type Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useButtons } from '@/hooks/translations/use-buttons';

interface UsersTableToolbarProps<TData> {
  table: Table<TData>;
}

export function UsersTableToolbar<TData>({ table }: UsersTableToolbarProps<TData>) {
  const buttons = useButtons();
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between overflow-x-auto">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={buttons('search')}
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
            {buttons('reset')}
            <X />
          </Button>
        )}
      </div>
      <Link href="/users/create">
        <Button variant="outline">{buttons('add')}</Button>
      </Link>
    </div>
  );
}
