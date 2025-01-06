import { describe, it, expect } from "vitest";
import { formatTextToTable } from "../../src/utils/formatText.js";

describe("formatTextToTable", () => {
  it("is defined", () => {
    expect(formatTextToTable, "formatTextToTable is not defined!").toBeDefined();
    expect(formatTextToTable, "formatTextToTable is not a function!").toBeTypeOf("function");
  });
  it("given empty array returns empty string", () => {
    expect(formatTextToTable([]), "function did not return empty string").toBe("");
  });
  it("given 2d empty array, returns empty string", () => {
    expect(formatTextToTable([ [] ]), "function did not return empty string").toBe("");
  });
  it("given 2d empty array, with separate defined headers, returns headers",
    () => {
      expect(
        formatTextToTable([], {
          headers: [ "one", "two" ],
        }), "did not return headers",
      ).toBe("one | two\n---------");
    });
  it(`given 2d empty array, with separate defined headers and a custom column delimiter, returns headers`,
    () => {
      expect(
        formatTextToTable([], {
          columnDelimiter: "l",
          headers:         [ "one", "two" ],
        }), "did not return headers",
      ).toBe("one l two\n---------");
    });
  it(`given 2d array, with separate defined headers and a custom column delimiter, returns table`,
    () => {
      expect(
        formatTextToTable(
          [
            [ "chicken", "egg" ],
            [ "true", "false" ],
          ],
          {
            columnDelimiter: "l",
            headers:         [ "one", "two" ],
          },
        ), "did not return headers",
      ).toBe("one     l two  \n---------------\nchicken l egg  \ntrue    l false");
    });
  it(`given 2d empty array, with empty separate defined headers, returns empty string`,
    () => {
      expect(
        formatTextToTable([ [] ], {
          headers: [],
        }), "did not return empty string",
      ).toBe("");
    });
  it(`given 2d array with data with headers and custom row delimiter, display table`,
    () => {
      expect(
        formatTextToTable(
          [
            [ "brad", "100" ],
            [ "foo", "50" ],
          ],
          {
            headers:      [ "name", "score" ],
            rowDelimiter: "_",
          },
        ), "did not return table",
      ).toBe("name | score\n____________\nbrad | 100  \nfoo  | 50   ");
    });
  it("given 2d array with data with long headers, display table", () => {
    expect(
      formatTextToTable(
        [
          [ "brad", "100" ],
          [ "foo", "bar" ],
        ],
        {
          headers: [ "name", "aggeeeeeeeee" ],
        },
      ), "did not return table",
    ).toBe(
      `name | aggeeeeeeeee\n-------------------\nbrad | 100         \nfoo  | bar         `,
    );
  });
});
