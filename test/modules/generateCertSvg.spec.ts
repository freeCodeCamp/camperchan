import { describe, assert, it } from "vitest";
import { generatorMap } from "../../src/modules/generateCertSvg.js";

describe("generateCertSvg", () => {
  it("has generator map object", () => {
    assert.isObject(generatorMap);
  });
});
