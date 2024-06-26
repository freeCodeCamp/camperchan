import { describe, assert, test } from "vitest";

import { reactionRoleClick } from "../../src/modules/reactionRoleClick";

describe("reactionRoleClick", () => {
  test("reactionRoleClick is a function", () => {
    assert.isFunction(reactionRoleClick);
  });
});
