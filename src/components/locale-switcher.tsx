'use client';

import { useLocale, useTranslations } from 'next-intl';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Locale, locales, setUserLocale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

type LocaleSwitcherProps = {
  className?: string;
};

const LocaleSwitcher = ({ className }: LocaleSwitcherProps) => {
  const t = useTranslations('LocaleSwitcher');
  const currentLocale = useLocale();

  return (
    <Select onValueChange={(locale: Locale) => setUserLocale(locale)} defaultValue={currentLocale}>
      <SelectTrigger className={cn('w-[120px]', className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('label')}</SelectLabel>
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
