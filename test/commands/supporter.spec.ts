import { describe, assert, test } from "vitest";

import { supporter } from "../../src/commands/supporter";

describe("supporter command", () => {
  test("is defined", () => {
    assert.isDefined(supporter);
  });
});
