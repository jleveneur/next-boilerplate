'use client';

import { type User } from '@supabase/supabase-js';
import { type ColumnDef, type Row } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/data-table-column-header';

import { UsersTableRowActions } from './users-table-row-actions';

export const getColumns = ({
  onDeleteClick,
}: {
  onDeleteClick: (row: Row<User>) => void;
}): ColumnDef<User>[] => {
  return [
    {
      header: 'Full Name',
      cell: ({ row }) => {
        return row.original.user_metadata.full_name;
      },
    },
    {
      accessorKey: 'email',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => {
        return row.original.user_metadata.role;
      },
    },
    {
      accessorKey: 'last_sign_in_at',
      header: 'Last Login',
      cell: ({ row }) => {
        return row.original.last_sign_in_at
          ? new Date(row.original.last_sign_in_at).toLocaleString()
          : 'Never';
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => <UsersTableRowActions row={row} onDeleteClick={onDeleteClick} />,
    },
  ];
};
