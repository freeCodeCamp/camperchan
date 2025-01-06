import { describe, expect, it } from "vitest";
import { userSettings } from "../../src/commands/userSettings.js";

describe("user settings command", () => {
  it("exists", () => {
    expect(userSettings).toBeDefined();
    expect(userSettings).not.toBeNull();
  });
});
