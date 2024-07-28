import { describe, assert, test } from "vitest";
import { authorRoleId, supporterRoleId } from "../../src/config/roles.js";

describe("roles config", () => {
  test("supporter role should be id", () => {
    assert.match(supporterRoleId, /^\d{16,19}$/);
  });

  test("author role should be id", () => {
    assert.match(authorRoleId, /^\d{16,19}$/);
  });
});
