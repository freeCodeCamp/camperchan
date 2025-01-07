import { format, type Options } from "prettier";
import stripAnsi from "strip-ansi";

const errorIsPrettierError = (
  error: unknown,
): error is {
  loc:       { start: { line: number; column: number } };
  codeFrame: string;
} => {
  return (
    typeof error === "object"
    && error !== null
    && "loc" in error
    && typeof error.loc === "object"
    && error.loc !== null
    && "start" in error.loc
    && typeof error.loc.start === "object"
    && error.loc.start !== null
    && "line" in error.loc.start
    && "column" in error.loc.start
    && "codeFrame" in error
  );
};

/**
 * Formats user's unformatted code received from user's message.
 * @param unformattedCode - The unformatted code received from the user's message.
 * @param language - Target language to format to.
 * @returns The formatted code or a code-block showing
 * where syntax error ocurred.
 */
export async function formatter(
  unformattedCode: string,
  language: string,
): Promise<string> {
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
    case "ts":
      options.parser = "typescript";
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
    default:
      break;
  }

  /*
   * When formatting code, if Prettier's parser detects a syntax error, it stops parsing
   * and throws an error message showing where a syntax error was occurred. We want
   * to use this syntax error detection and send it do Discord. But Prettier's error
   * message is colorized using ANSI to help developer detect the error, which is why
   * the message, if sent to Discord, can't be displayed. That's why we use `stripAnsi`
   * in the next line to remove any ANSI provided by Prettier's parser
   */
  const formattedCode = await format(unformattedCode, options).catch(
    (error: unknown) => {
      if (!errorIsPrettierError(error)) {
        throw error;
      }
      return stripAnsi(
        `SyntaxError: Unexpected token (${String(error.loc.start.line)}:${String(error.loc.start.column)})\n\n${String(error.codeFrame)}`,
      );
    },
  );
  return formattedCode;
}
