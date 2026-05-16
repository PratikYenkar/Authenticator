import { useSettingsStore } from '../store/settingsStore';
import { translations, TranslationKeys } from '../i18n/translations';

export function useTranslation(): TranslationKeys {
  const language = useSettingsStore(s => s.language);
  return translations[language] ?? translations.en;
}
