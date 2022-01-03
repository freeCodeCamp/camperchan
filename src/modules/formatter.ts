import { format, Options } from "prettier";
import stripAnsi from "strip-ansi";
/**
 * Formats user's unformatted code received from user's message.
 *
 * @param {string} unformattedCode The unformatted code received from the user's message.
 * @param {string} language Target language to format to.
 * @returns {string} The formatted code or a code-block showing
 * where syntax error ocurred.
 */
export function formatter(unformattedCode: string, language: string): string {
  const options: Options = {
    trailingComma: "none",
  };

  switch (language) {
    case "html":
      options.parser = "html";
      break;
    case "css":
      options.parser = "css";
      break;
    case "js":
      options.parser = "babel";
      break;
    case "json":
      options.parser = "json";
      break;
    case "markdown":
      options.parser = "markdown";
      break;
    case "yaml":
      options.parser = "yaml";
      break;
  }

  let formattedCode = "";

  try {
    formattedCode = format(unformattedCode, options);
  } catch (err) {
    // When formatting code, if Prettier's parser detects a syntax error, it stops parsing
    // and throws an error message showing where a syntax error was occurred. We want
    // to use this syntax error detection and send it do Discord. But Prettier's error
    // message is colorized using ANSI to help developer detect the error, which is why
    // the message, if sent to Discord, can't be displayed. That's why we use `stripAnsi`
    // in the next line to remove any ANSI provided by Prettier's parser
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = err as any;
    formattedCode = stripAnsi(
      `SyntaxError: Unexpected token (${error.loc.start.line}:${error.loc.start.column})\n\n${error.codeFrame}`
    );
  }

  return formattedCode;
}
