import { describe, assert, test } from "vitest";
import { handleThreadCreate }
  from "../../../src/events/handlers/handleThreadCreate.js";

describe("handleThreadCreate", () => {
  test("handleThreadCreate is a function", () => {
    assert.isFunction(handleThreadCreate);
  });
});
