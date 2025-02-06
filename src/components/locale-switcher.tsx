'use client';

import { useLocale } from 'next-intl';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useComponents } from '@/hooks/translations/use-components';
import { Locale, locales, setUserLocale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

type LocaleSwitcherProps = {
  className?: string;
};

const LocaleSwitcher = ({ className }: LocaleSwitcherProps) => {
  const t = useComponents('locale_switcher');
  const currentLocale = useLocale();

  return (
    <Select onValueChange={(locale: Locale) => setUserLocale(locale)} defaultValue={currentLocale}>
      <SelectTrigger className={cn('h-7 w-[100px]', className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {locales.map((locale) => (
            <SelectItem key={locale} value={locale}>
              {t(locale)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export { LocaleSwitcher };
