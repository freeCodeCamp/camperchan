import { describe, assert, test } from "vitest";

import { levelListener } from "../../src/modules/levelListener";

describe("levelListener", () => {
  test("levelListener is a function", () => {
    assert.isFunction(levelListener);
  });
});
