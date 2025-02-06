'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Switch } from './ui/switch';

type ThemeSwitcherProps = {
  className?: string;
};

const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  // and can show the switch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Switch
      className={className}
      checked={theme === 'dark'}
      onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    />
  );
};

export { ThemeSwitcher };
