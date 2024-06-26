import { describe, assert, test } from "vitest";

import { loadRoles } from "../../src/modules/loadRoles.js";

describe("load roles module", () => {
  test("is defined", () => {
    assert.isDefined(loadRoles);
  });
});
