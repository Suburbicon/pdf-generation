/**
 * @description
 * appRoot Expected to be correct depending on serve/build execution runtime
 * @example vite build - /Users/../../Yeanot/dist
 * @example vite serve - /Users/../../Yeanot/
 */
export const appRoot = new URL('.', import.meta.url).pathname;
