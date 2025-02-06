import { useComponents } from '@/hooks/translations/use-components';

import { LocaleSwitcher } from './locale-switcher';
import { ThemeSwitcher } from './theme-switcher';
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from './ui/sidebar';

const UserPreferences = () => {
  const t = useComponents('user_preferences');

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t('label')}</SidebarGroupLabel>
      <SidebarGroupContent className="space-y-2">
        <div className="flex items-center justify-between pl-2">
          <span>{t('dark_mode')}</span>
          <ThemeSwitcher />
        </div>
        <div className="flex items-center justify-between pl-2">
          <span>{t('language')}</span>
          <LocaleSwitcher />
        </div>
        <SidebarMenu></SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export { UserPreferences };
