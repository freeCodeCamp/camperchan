/**
 * @name isSupportedByPrettier
 * Checks if Prettier can format the code by looking at Prettier's
 * supoorted language (mainly checks Prettier's supported parsers).
 * For more info Prettier's supported parsers visit: https://prettier.io/docs/en/options.html#parser
 *
 * @param languageName The language to check
 *
 * @returns  Returns the name of the language
 * if it is supported by Prettier's perser otherwise returns false
 */

export function isSupportedByPrettier(languageName: string): string | false {
  const languageNameInLowercase = languageName.toLowerCase();

  const cssAliases = ['css', 'scss'];
  const jsAliaseses = ['javascript', 'js'];

  if (languageNameInLowercase === 'html') {
    return 'html';
  }

  if (cssAliases.includes(languageNameInLowercase)) {
    return 'css';
  }

  if (jsAliaseses.includes(languageNameInLowercase)) {
    return 'js';
  }

  if (languageNameInLowercase === 'json') {
    return 'json';
  }

  if (languageNameInLowercase === 'markdown') {
    return 'markdown';
  }

  if (languageNameInLowercase === 'yaml') {
    return 'yaml';
  }

  return false;
}
