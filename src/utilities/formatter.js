const prettier = require('prettier');
const stripAnsi = require('strip-ansi');

function formatter(unformattedCode, language) {
  let options = {
    trailingComma: 'none',
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
}

module.exports = formatter;
