import { assert } from "chai";

import { generateDiff } from "../../src/utils/generateDiff";

suite("generateDiff", () => {
  test("is defined", () => {
    assert.isDefined(generateDiff, "generateDiff is not defined");
    assert.isFunction(generateDiff, "generateDiff is not a function");
  });
});
