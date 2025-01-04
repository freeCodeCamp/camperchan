import { describe, it, expect } from "vitest";
import { generatorMap } from "../../src/modules/generateCertSvg.js";

describe("generateCertSvg", () => {
  it("has generator map object", () => {
    expect(generatorMap).toBeTypeOf("object");
  });
});
