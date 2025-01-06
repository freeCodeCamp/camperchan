import { describe, expect, it } from "vitest";
import {
  validateColour,
  validateImage,
} from "../../src/modules/settingsValidation.js";

describe("settings validation", () => {
  it("validateColour", () => {
    expect(validateColour).toBeDefined();
    expect(validateColour).not.toBeNull();
  });

  it("validateImage", () => {
    expect(validateImage).toBeDefined();
    expect(validateImage).not.toBeNull();
  });
});
