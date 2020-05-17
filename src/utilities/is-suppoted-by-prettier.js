/**
 * @name isSuppotedByPrettier
 * Checks if Prettier can format the code by looking at Prettier's
 * supoorted language (mainly checks Prettier's supported parsers).
 * For more info Prettier's supported parsers visit: https://prettier.io/docs/en/options.html#parser
 *
 * @param {string} languageName The language to check
 *
 * @returns {string | boolean} Returns the name of the language
 * if it is supported by Prettier's perser otherwise returns false
 */

module.exports = function isSuppotedByPrettier(languageName) {
  console.log(languageName);

  const htmlAliases = ['html', 'xml', 'xhtml', 'rss', 'svg'];
  const cssAliases = ['css', 'scss', 'sass'];
  const jsAliaseses = [
    'javascript',
    'js',
    'coffeescript',
    'xquery',
    'stata',
    'scheme',
    'clojure',
    'vbscript',
    'shell',
  ];

  if (htmlAliases.includes(languageName)) {
    return 'html';
  }

  if (cssAliases.includes(languageName)) {
    return 'css';
  }

  if (jsAliaseses.includes(languageName)) {
    return 'js';
  }

  if (languageName === 'json') {
    return 'json';
  }

  if (languageName === 'markdown') {
    return 'markdown';
  }

  if (languageName === 'yaml') {
    return 'yaml';
  }

  return false;
};
