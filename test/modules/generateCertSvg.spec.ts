import { describe, assert, test } from "vitest";

import { generatorMap } from "../../src/modules/generateCertSvg";

describe("generateCertSvg", () => {
  test("has generator map object", () => {
    assert.isObject(generatorMap);
  });
});
