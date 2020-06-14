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

export function formatter(unformattedCode: string, language: string): string {
  const options = {
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
    // When formatting code, if Prettier's parser detects a syntax error, it stops parsing
    // and throws an error message showing where a syntax error was occured. We want
    // to use this syntax error detection and send it do Discord. But Prettier's error
    // message is colorrized using ANSI to help developer detect the error, which is why
    // the message, if sent to Discord, can't be displayed. That's why we use `stripAnsi`
    // in the next line to remove any ANSI provided by Prettier's parser

    formattedCode = stripAnsi(
      `SyntaxError: Unexpected token (${error.loc.start.line}:${error.loc.start.column})\n\n${error.codeFrame}`
    );
  }

  return formattedCode;
}
