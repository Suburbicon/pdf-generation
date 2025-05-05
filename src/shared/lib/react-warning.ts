import { isString } from 'lodash-es';

/**
 * @description suppress react warnings such as "jsx key prop"
 * since for SSR only environment this rule is not applicable
 *
 * @see https://github.com/facebook/react/issues/12567
 */
export function suppressReactDevWarnings() {
  if (!__DEV__) {
    return;
  }

  const KEY_PROP_REGEX =
    /^Warning: Each child in a list should have a unique "key" prop/;

  const consoleError = global.console.error;

  global.console.error = (msg, ...args: unknown[]) => {
    if (isString(msg) && KEY_PROP_REGEX.test(msg)) {
      return;
    }

    consoleError(msg, ...args);
  };
}
