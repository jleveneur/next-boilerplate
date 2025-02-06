import { useTranslations } from 'next-intl';

export const useFeatures = (featureName: keyof IntlMessages['features']) =>
  useTranslations(`features.${featureName}`);
