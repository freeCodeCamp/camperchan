import { describe, assert, it } from "vitest";
import { formatTextToTable } from "../../src/utils/formatText.js";

describe("formatTextToTable", () => {
  it("is defined", () => {
    assert.isDefined(formatTextToTable, "formatTextToTable is not defined!");
    assert.isFunction(
      formatTextToTable,
      "formatTextToTable is not a function!",
    );
  });
  it("given empty array returns empty string", () => {
    assert.deepEqual(
      formatTextToTable([]),
      "",
      "function did not return empty string",
    );
  });
  it("given 2d empty array, returns empty string", () => {
    assert.deepEqual(
      formatTextToTable([ [] ]),
      "",
      "function did not return empty string",
    );
  });
  it("given 2d empty array, with separate defined headers, returns headers",
    () => {
      assert.deepEqual(
        formatTextToTable([], {
          headers: [ "one", "two" ],
        }),
        "one | two\n---------",
        "did not return headers",
      );
    });
  it(`given 2d empty array, with separate defined headers and a custom column delimiter, returns headers`,
    () => {
      assert.deepEqual(
        formatTextToTable([], {
          columnDelimiter: "l",
          headers:         [ "one", "two" ],
        }),
        "one l two\n---------",
        "did not return headers",
      );
    });
  it(`given 2d array, with separate defined headers and a custom column delimiter, returns table`,
    () => {
      assert.deepEqual(
        formatTextToTable(
          [
            [ "chicken", "egg" ],
            [ "true", "false" ],
          ],
          {
            columnDelimiter: "l",
            headers:         [ "one", "two" ],
          },
        ),
        "one     l two  \n---------------\nchicken l egg  \ntrue    l false",
        "did not return headers",
      );
    });
  it(`given 2d empty array, with empty separate defined headers, returns empty string`,
    () => {
      assert.deepEqual(
        formatTextToTable([ [] ], {
          headers: [],
        }),
        "",
        "did not return empty string",
      );
    });
  it(`given 2d array with data with headers and custom row delimiter, display table`,
    () => {
      assert.deepEqual(
        formatTextToTable(
          [
            [ "brad", "100" ],
            [ "foo", "50" ],
          ],
          {
            headers:      [ "name", "score" ],
            rowDelimiter: "_",
          },
        ),
        "name | score\n____________\nbrad | 100  \nfoo  | 50   ",
        "did not return table",
      );
    });
  it("given 2d array with data with long headers, display table", () => {
    assert.deepEqual(
      formatTextToTable(
        [
          [ "brad", "100" ],
          [ "foo", "bar" ],
        ],
        {
          headers: [ "name", "aggeeeeeeeee" ],
        },
      ),
      `name | aggeeeeeeeee\n-------------------\nbrad | 100         \nfoo  | bar         `,
      "did not return table",
    );
  });
});
