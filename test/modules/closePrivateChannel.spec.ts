import { describe, expect, it } from "vitest";
import { closePrivateChannel } from "../../src/modules/closePrivateChannel.js";

describe("closePrivateChannel", () => {
  it("is defined", () => {
    expect(closePrivateChannel,"closePrivateChannel is not defined").toBeDefined();
    expect(closePrivateChannel, "closePrivateChannel is not a function").toBeTypeOf("function");
  });
});
