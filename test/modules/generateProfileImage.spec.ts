import { assert } from "chai";

import { generateProfileImage } from "../../src/modules/generateProfileImage";

suite("generateProfileImage", () => {
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
