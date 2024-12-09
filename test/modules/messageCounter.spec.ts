import { describe, assert, it } from "vitest";
import { messageCounter } from "../../src/modules/messageCounter.js";

describe("message counter module", () => {
  it("is defined", () => {
    assert.isDefined(messageCounter);
  });
});
