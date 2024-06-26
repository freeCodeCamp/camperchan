import { describe, assert, test } from "vitest";

import { handleMessageCreate } from "../../../src/events/handlers/handleMessageCreate";

describe("handleMessageCreate", () => {
  test("handleMessageCreate is a function", () => {
    assert.isFunction(handleMessageCreate);
  });
});
