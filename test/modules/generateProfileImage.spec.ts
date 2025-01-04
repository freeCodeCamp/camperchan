import { describe, expect, it } from "vitest";
import { generateProfileImage }
  from "../../src/modules/generateProfileImage.js";

describe("generateProfileImage", () => {
  it("is defined", () => {
    assert.isDefined(
      generateProfileImage,
      "generateProfileImage is not defined",
    );
    expect(generateProfileImage, "generateProfileImage is not a function").toBeTypeOf("function");
  });
});
