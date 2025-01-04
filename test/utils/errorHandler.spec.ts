import { describe, expect, it } from "vitest";
import { errorHandler } from "../../src/utils/errorHandler.js";

describe("errorHandler", () => {
  it("is defined", () => {
    expect(errorHandler,"errorHandler is not defined").toBeDefined();
    expect(errorHandler, "errorHandler is not a function").toBeTypeOf("function");
  });
});
