// @ts-expect-error could not resolve type defs
import { hyphenateSync } from 'hyphen/en';
import type { HyphenationFunctionSync } from 'hyphen';

/**
 * @description https://en.wikipedia.org/wiki/Soft_hyphen
 */
const SOFT_HYPHEN = '\u00ad';

function hyphenateName(word: string) {
  return (hyphenateSync as HyphenationFunctionSync)(word).split(SOFT_HYPHEN);
}

export { hyphenateName };
