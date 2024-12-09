import { describe, assert, it } from "vitest";
import { authorRoleId, supporterRoleId } from "../../src/config/roles.js";

describe("roles config", () => {
  it("supporter role should be id", () => {
    assert.match(supporterRoleId, /^\d{16,19}$/);
  });

  it("author role should be id", () => {
    assert.match(authorRoleId, /^\d{16,19}$/);
  });
});
