'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { useButtons } from '@/hooks/translations/use-buttons';

type ModeToggleProps = {
  className?: string;
};

const ModeToggle = ({ className }: ModeToggleProps) => {
  const t = useButtons();
  const { setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className={className}
      onClick={() => setTheme((previous) => (previous === 'dark' ? 'light' : 'dark'))}
    >
      <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">{t('toggle')}</span>
    </Button>
  );
};

export { ModeToggle };
