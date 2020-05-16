function isSuppotedByPrettier(languageName) {
  console.log(languageName);

  const htmlAliases = ['html', 'xml', 'xhtml', 'rss', 'svg'];
  const cssAlias = ['css', 'scss', 'sass'];
  const jsAliases = [
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

  if (cssAlias.includes(languageName)) {
    return 'css';
  }

  if (jsAliases.includes(languageName)) {
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
}

module.exports = isSuppotedByPrettier;
