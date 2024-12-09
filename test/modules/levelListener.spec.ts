import { describe, assert, it } from "vitest";
import { levelListener } from "../../src/modules/levelListener.js";

describe("levelListener", () => {
  it("levelListener is a function", () => {
    assert.isFunction(levelListener);
  });
});
