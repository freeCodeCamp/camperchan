import { describe, assert, test } from "vitest";

import { messageCounter } from "../../src/modules/messageCounter.js";

describe("message counter module", () => {
  test("is defined", () => {
    assert.isDefined(messageCounter);
  });
});
