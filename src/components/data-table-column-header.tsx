import { type Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

/**
 * A component that renders a column header for a data table with sorting functionality.
 *
 * @template TData - The type of data in the column.
 * @template TValue - The type of value in the column.
 *
 * @param {DataTableColumnHeaderProps<TData, TValue>} props - The props for the component.
 * @param {Column<TData, TValue>} props.column - The column object from `@tanstack/react-table`.
 * @param {string} props.title - The title of the column.
 * @param {string} [props.className] - Additional class names to apply to the component.
 *
 * @returns The rendered column header component.
 *
 * @example
 * ```tsx
 * <DataTableColumnHeader
 *   column={column}
 *   title="Column Title"
 *   className="custom-class"
 * />
 * ```
 */
export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const t = useTranslations('DataTableColumnHeader');

  // If the column cannot be sorted, just display the title
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  // Get the sorting icon based on the current sorting state
  const getSortingIcon = (isSorted: string | boolean) => {
    if (isSorted === 'desc') return <ArrowDown />;
    if (isSorted === 'asc') return <ArrowUp />;
    return <ChevronsUpDown />;
  };

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
            <span className="text-sm">{title}</span>
            {getSortingIcon(column.getIsSorted())}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp className="size-3.5 text-muted-foreground/70" />
            {t('asc')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown className="size-3.5 text-muted-foreground/70" />
            {t('desc')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
