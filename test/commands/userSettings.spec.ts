import { describe, expect, it } from "vitest";
import { userSettings } from "../../src/commands/userSettings.js";

describe("user settings command", () => {
  it("exists", () => {
    assert.exists(userSettings);
  });
});
