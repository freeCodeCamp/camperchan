import { assert } from "chai";

import { generatorMap } from "../../src/modules/generateCertSvg";

suite("generateCertSvg", () => {
  test("has generator map object", () => {
    assert.isObject(generatorMap);
  });
});
