import { describe, expect, it } from "vitest";
import { loadRoles } from "../../src/modules/loadRoles.js";

describe("load roles module", () => {
  it("is defined", () => {
    expect(loadRoles).toBeDefined();
  });
});
