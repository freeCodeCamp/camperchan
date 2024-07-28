import { describe, assert, test } from "vitest";
import { handleMemberAdd }
  from "../../../src/events/handlers/handleMemberAdd.js";

describe("handleMemberAdd", () => {
  test("handleMemberAdd is a function", () => {
    assert.isFunction(handleMemberAdd);
  });
});
