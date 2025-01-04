import { describe, expect, it } from "vitest";
import { messageCounter } from "../../src/modules/messageCounter.js";

describe("message counter module", () => {
  it("is defined", () => {
    expect(messageCounter).toBeDefined();
  });
});
