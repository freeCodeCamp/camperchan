import { describe, expect, it } from "vitest";
import { reactionRoleClick } from "../../src/modules/reactionRoleClick.js";

describe("reactionRoleClick", () => {
  it("reactionRoleClick is a function", () => {
    expect(reactionRoleClick).toBeTypeOf("function");
  });
});
