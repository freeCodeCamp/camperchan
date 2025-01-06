import { describe, expect, it } from "vitest";
import { authorRoleId, supporterRoleId } from "../../src/config/roles.js";

describe("roles config", () => {
  it("supporter role should be id", () => {
    expect(supporterRoleId).toMatch(/^\d{16,19}$/);
  });

  it("author role should be id", () => {
    expect(authorRoleId).toMatch(/^\d{16,19}$/);
  });
});
