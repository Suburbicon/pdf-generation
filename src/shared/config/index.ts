import { join } from 'node:path';
import { appRoot } from '~/approot.ts';

export const LOCALES_DIR = import.meta.env.DEV
  ? join(appRoot, 'public/locales')
  : join(appRoot, 'locales');

export const FONTS_DIR = import.meta.env.DEV
  ? join(appRoot, 'public/fonts')
  : join(appRoot, 'fonts');

export const TENANT = {
  AVIATA_KZ: 'aviata-kz',
  CHOCO_KZ: 'choco-kz',
  B2B_KZ: 'b2b-kz',
  RAILWAYS_KZ: 'railways-kz',
} as const;
