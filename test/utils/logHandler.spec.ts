import { describe, expect, it } from "vitest";
import { logHandler } from "../../src/utils/logHandler.js";

describe("logHandler", () => {
  it("is defined", () => {
    expect(logHandler, "logHandler is not defined").toBeDefined();
    expect(logHandler).toBeTypeOf("object", "logHandler is not an object");
  });

  it("has log function", () => {
    expect(logHandler.log, "log is not defined").toBeDefined();
    expect(logHandler.log, "log is not a function").toBeTypeOf("function");
  });
});
