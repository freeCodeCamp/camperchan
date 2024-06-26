import { describe, assert, test } from "vitest";

import { handleMessageDelete } from "../../../src/events/handlers/handleMessageDelete";

describe("handleMessageDelete", () => {
  test("handleMessageDelete is a function", () => {
    assert.isFunction(handleMessageDelete);
  });
});
