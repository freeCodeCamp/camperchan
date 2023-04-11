import { assert } from "chai";

import { closePrivateChannel } from "../../src/modules/closePrivateChannel";

suite("closePrivateChannel", () => {
  test("is defined", () => {
    assert.isDefined(closePrivateChannel, "closePrivateChannel is not defined");
    assert.isFunction(
      closePrivateChannel,
      "closePrivateChannel is not a function"
    );
  });
});
