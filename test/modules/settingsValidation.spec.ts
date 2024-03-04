import { assert } from "chai";

import {
  validateColour,
  validateImage
} from "../../src/modules/settingsValidation";

suite("settings validation", () => {
  test("validateColour", () => {
    assert.exists(validateColour);
  });

  test("validateImage", () => {
    assert.exists(validateImage);
  });
});
