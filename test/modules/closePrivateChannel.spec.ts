import { describe, assert, it } from "vitest";
import { closePrivateChannel } from "../../src/modules/closePrivateChannel.js";

describe("closePrivateChannel", () => {
  it("is defined", () => {
    assert.isDefined(closePrivateChannel, "closePrivateChannel is not defined");
    assert.isFunction(
      closePrivateChannel,
      "closePrivateChannel is not a function",
    );
  });
});
