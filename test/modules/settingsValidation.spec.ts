import { describe, expect, it } from "vitest";
import {
  validateColour,
  validateImage,
} from "../../src/modules/settingsValidation.js";

describe("settings validation", () => {
  it("validateColour", () => {
    assert.exists(validateColour);
  });

  it("validateImage", () => {
    assert.exists(validateImage);
  });
});
