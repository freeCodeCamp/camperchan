const prettier = require('prettier');
const stripAnsi = require('strip-ansi');

/**
 * @name formatter
 * Formats user's unformatted code recieved from user's message
 *
 * @param {string} unformattedCode The unformatted code recieved from user's message
 * @param {string} language Target language to format to
 *
 * @returns {string} The formatted code or a codeblock showing
 * where syntax error occured
 */

module.exports = function formatter(unformattedCode, language) {
  let options = {
    trailingComma: 'none'
  };

  switch (language) {
    case 'html':
      options.parser = 'html';
      break;

    case 'css':
      options.parser = 'css';
      break;
    case 'js':
      options.parser = 'babel';
      break;
    case 'json':
      options.parser = 'json';
      break;
    case 'markdown':
      options.parser = 'markdown';
      break;
    case 'yaml':
      options.parser = 'yaml';
      break;
  }

  console.log(options);

  let formattedCode = '';

  try {
    formattedCode = prettier.format(unformattedCode, options);
  } catch (error) {
    formattedCode = stripAnsi(
      `SyntaxError: Unexpected token (${error.loc.start.line}:${error.loc.start.column})\n\n${error.codeFrame}`
    );
  }

  return formattedCode;
};
