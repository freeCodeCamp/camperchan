import { describe, expect, it } from "vitest";
import { handleMemberAdd }
  from "../../../src/events/handlers/handleMemberAdd.js";

describe("handleMemberAdd", () => {
  it("handleMemberAdd is a function", () => {
    expect(handleMemberAdd).toBeTypeOf("function");
  });
});
