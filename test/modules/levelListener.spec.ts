import { describe, assert, test } from "vitest";

import { levelListener } from "../../src/modules/levelListener.js";

describe("levelListener", () => {
  test("levelListener is a function", () => {
    assert.isFunction(levelListener);
  });
});
