/**
 * Data that can be parsed. All elements will be automatically
 * casted to strings, which could create issues if the data
 * passed is inconsistent.
 */
type UnformattedData = Array<Array<unknown>>;

/**
 * Format options that can be passed.
 */
interface FormatOptions {

  /**
   * This can be used to provide a list of headers,
   * rather than passing them in as the first row of
   * unformatted text.
   */
  headers?: Array<string>;

  /**
   * The column delimiter character(s), defaults to `|`.
   * This character(s) is automatically padded with spaces
   * on either side automatically.
   */
  columnDelimiter?: string;

  /**
   * The row delimiter character(s), defaults to `-`.
   * Only used between the header, and the rows of data.
   */
  rowDelimiter?: string;
}

/**
 * Formats text into a table object.
 * @param data - The unformatted data we will display.
 * @param options - Optional options that can be passed to slightly
 * configure the formatting.
 * @returns The formatted text.
 */
export const formatTextToTable = (
  data: UnformattedData,
  options?: FormatOptions,
): string => {
  // Alias for simplicity
  const rows = data;
  const headers = options?.headers ?? (data.at(0) ?? []).map(String);
  const hasInferredHeaders = !options?.headers;
  const columnDelimiter = options?.columnDelimiter ?? "|";
  const rowDelimiter = options?.rowDelimiter ?? "-";

  const baseColumnWidths = headers.map((header) => {
    return String(header).length;
  });
  // eslint-disable-next-line unicorn/no-array-reduce
  const columnWidths = rows.reduce((accumulator: Array<number>, row) => {
    for (const [ index, column ] of row.entries()) {
      const currentColumnLength = String(column).length;
      const current = accumulator[index];
      if (current !== undefined && currentColumnLength > current) {
        accumulator[index] = currentColumnLength;
      }
    }
    return accumulator;
  }, baseColumnWidths);

  const rowSeparatorString = columnWidths.length > 0
    ? new Array(

      /*
       * **Note** we add an extra one for the space separation applied
       * To each column.
       */
      columnWidths.reduce(
        (accumulator, number) => {
          return accumulator + number + 2 + columnDelimiter.length;
        },
      ),
    ).
      fill(rowDelimiter).
      join("")
    : "";

  const dataString = rows.map((row) => {
    return row.
      map((column, index) => {
        return String(column).padEnd(columnWidths[index] ?? 0, " ");
      }).
      join(` ${columnDelimiter} `);
  });
  const headersString = headers.
    map((header, index) => {
      return header.padEnd(columnWidths[index] ?? 0);
    }).
    join(` ${columnDelimiter} `);

  return [
    headersString,
    rowSeparatorString,
    ...hasInferredHeaders
      ? dataString.slice(1)
      : dataString,
  ].
    filter(Boolean).
    join("\n");
};
