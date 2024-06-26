import { describe, assert, test } from "vitest";

import { userSettings } from "../../src/commands/userSettings";

describe("user settings command", () => {
  test("exists", () => {
    assert.exists(userSettings);
  });
});
