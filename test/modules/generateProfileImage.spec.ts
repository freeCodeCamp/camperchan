import { describe, assert, it } from "vitest";
import { generateProfileImage }
  from "../../src/modules/generateProfileImage.js";

describe("generateProfileImage", () => {
  it("is defined", () => {
    assert.isDefined(
      generateProfileImage,
      "generateProfileImage is not defined",
    );
    assert.isFunction(
      generateProfileImage,
      "generateProfileImage is not a function",
    );
  });
});
