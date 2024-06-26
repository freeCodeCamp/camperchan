import { describe, assert, test } from "vitest";

import { generateProfileImage } from "../../src/modules/generateProfileImage";

describe("generateProfileImage", () => {
  test("is defined", () => {
    assert.isDefined(
      generateProfileImage,
      "generateProfileImage is not defined"
    );
    assert.isFunction(
      generateProfileImage,
      "generateProfileImage is not a function"
    );
  });
});
