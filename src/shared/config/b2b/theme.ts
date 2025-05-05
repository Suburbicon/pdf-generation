import { CSS } from '~/src/shared/lib/css/index.ts';

const theme = {
  /**
   * @see https://www.figma.com/file/6JJvyIdxWDRIRhtn1BHqp2/Library.Core-%5BW%5D?type=design&node-id=678-8965&t=LRMSPN3CraUCwyOV-0
   */
  colors: {
    white: '#FFFFFF',
    black: '#202122',
    gray: {
      50: '#F0F0F0',
      75: '#F8F8FB',
      100: '#F7F7FC',
      150: '#F1F2F7',
      200: '#EEEEEE',
      300: '#DBDBDB',
      400: '#B9B9B9',
      450: '#A4A2B7',
      500: '#83878F',
      600: '#707276',
      700: '#596378',
    },
    green: {
      200: '#E9F8DD',
      600: '#55BB06',
      700: '#40A61B',
      800: '#489E05',
    },
    purple: {
      200: '#E3E8FF',
      600: '#7284E4',
      800: '#546ADE',
    },
    red: {
      200: '#FFDCD5',
      600: '#F73D34',
    },
    orange: {
      500: '#FFA254',
    },
    yellow: {
      200: '#FFF2D1',
    },
    blue: {
      200: '#B0E2FA',
      600: '#3AB6F2',
      500: '#3D8AC2',
    },
  },
  fontSize: {
    xs: CSS.px(12),
    sm: CSS.px(14),
    md: CSS.px(16),
    lg: CSS.px(18),
    xl: CSS.px(24),
  },
  fontWeight: {
    normal: 400,
    semibold: 600,
    bold: 700,
  },
} as const;

export { theme };
