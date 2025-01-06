import { describe, expect, it } from "vitest";
import { levelListener } from "../../src/modules/levelListener.js";

describe("levelListener", () => {
  it("levelListener is a function", () => {
    expect(levelListener).toBeTypeOf("function");
  });
});
