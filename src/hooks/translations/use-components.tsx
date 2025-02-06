import { useTranslations } from 'next-intl';

export const useComponents = (componentName: keyof IntlMessages['components']) =>
  useTranslations(`components.${componentName}`);
