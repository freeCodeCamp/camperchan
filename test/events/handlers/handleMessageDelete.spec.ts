import { describe, assert, test } from "vitest";

import { handleMessageDelete } from "../../../src/events/handlers/handleMessageDelete.js";

describe("handleMessageDelete", () => {
  test("handleMessageDelete is a function", () => {
    assert.isFunction(handleMessageDelete);
  });
});
