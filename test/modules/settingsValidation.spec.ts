import { describe, assert, test } from "vitest";
import {
  validateColour,
  validateImage,
} from "../../src/modules/settingsValidation.js";

describe("settings validation", () => {
  test("validateColour", () => {
    assert.exists(validateColour);
  });

  test("validateImage", () => {
    assert.exists(validateImage);
  });
});
