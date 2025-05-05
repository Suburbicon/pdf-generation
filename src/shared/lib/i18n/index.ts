import path from 'node:path';
import { lstatSync, readdirSync } from 'node:fs';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import {
  LanguageDetector,
  plugin as i18nextPlugin,
} from 'i18next-http-middleware';
import { initReactI18next } from 'react-i18next';
import { LOCALES_DIR } from '~/src/shared/config/index.ts';

const DEFAULT_LNG = 'ru';
const SUPPORTED_LNGS = ['ru', 'kk', 'en'];

const namespaces = readdirSync(LOCALES_DIR).filter(file => {
  const fullPath = path.join(LOCALES_DIR, file);
  return lstatSync(fullPath).isDirectory();
});

const languagesToPreload = readdirSync(
  path.join(LOCALES_DIR, namespaces[0])
).map(file => {
  return path.parse(file).name;
});

const i18nInstance = i18next.createInstance({
  /**
   * Use synchronous init
   */
  initImmediate: false,
  /**
   * Disable fallback behavior.
   * In future something like "common" might be configured as default
   */
  defaultNS: false,
  fallbackLng: DEFAULT_LNG,
  supportedLngs: SUPPORTED_LNGS,
  ns: namespaces,
  preload: languagesToPreload,
  backend: {
    loadPath: path.join(LOCALES_DIR, '{{ ns }}/{{ lng }}.json'),
  },
  react: {
    useSuspense: false,
  },
  detection: {
    order: ['header'],
  },
});

i18nInstance.use(initReactI18next);
i18nInstance.use(LanguageDetector);
i18nInstance.use(Backend);

await i18nInstance.init();

export { i18nInstance, i18nextPlugin };
