import { describe, assert, it } from "vitest";
import { loadRoles } from "../../src/modules/loadRoles.js";

describe("load roles module", () => {
  it("is defined", () => {
    assert.isDefined(loadRoles);
  });
});
