import { describe, assert, test } from "vitest";

import { handleMessageCreate } from "../../../src/events/handlers/handleMessageCreate.js";

describe("handleMessageCreate", () => {
  test("handleMessageCreate is a function", () => {
    assert.isFunction(handleMessageCreate);
  });
});
