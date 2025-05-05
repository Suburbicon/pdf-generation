type Style = import('@react-pdf/types').Style;

/**
 * @example
 * const Component: React.FC<WithStyle> = ...
 */
type WithStyle = { style?: Style };

/**
 * @description Build time constant
 * @see vite.config.ts
 */
declare const __DEV__: boolean;
