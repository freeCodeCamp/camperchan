import { describe, assert, it } from "vitest";
import { handleMemberAdd }
  from "../../../src/events/handlers/handleMemberAdd.js";

describe("handleMemberAdd", () => {
  it("handleMemberAdd is a function", () => {
    assert.isFunction(handleMemberAdd);
  });
});
