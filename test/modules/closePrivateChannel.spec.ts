import { describe, assert, test } from "vitest";

import { closePrivateChannel } from "../../src/modules/closePrivateChannel.js";

describe("closePrivateChannel", () => {
  test("is defined", () => {
    assert.isDefined(closePrivateChannel, "closePrivateChannel is not defined");
    assert.isFunction(
      closePrivateChannel,
      "closePrivateChannel is not a function"
    );
  });
});
