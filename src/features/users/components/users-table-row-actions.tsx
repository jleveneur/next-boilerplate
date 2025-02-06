'use client';

import { type User } from '@supabase/supabase-js';
import { type Row } from '@tanstack/react-table';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useButtons } from '@/hooks/translations/use-buttons';

interface UsersTableRowActionsProps {
  row: Row<User>;
  onDeleteClick: (row: Row<User>) => void;
}

export function UsersTableRowActions({ row, onDeleteClick }: UsersTableRowActionsProps) {
  const t = useButtons();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex size-8 p-0 data-[state=open]:bg-muted">
          <MoreHorizontal />
          <span className="sr-only">{t('open')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <Link href={`/users/${row.original.id}`}>
          <DropdownMenuItem className="flex items-center gap-3">
            <Edit />
            {t('edit')}
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-3 text-red-700 hover:text-red-700 focus:bg-[#FF666618] focus:text-red-700"
          onClick={() => onDeleteClick(row)}
        >
          <Trash />
          {t('delete')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
