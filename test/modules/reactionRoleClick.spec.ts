import { describe, assert, test } from "vitest";

import { reactionRoleClick } from "../../src/modules/reactionRoleClick.js";

describe("reactionRoleClick", () => {
  test("reactionRoleClick is a function", () => {
    assert.isFunction(reactionRoleClick);
  });
});
