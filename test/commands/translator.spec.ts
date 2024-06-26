import { describe, assert, test } from "vitest";

import { translator } from "../../src/commands/translator";

describe("translator command", () => {
  test("is defined", () => {
    assert.isDefined(translator);
  });
});
