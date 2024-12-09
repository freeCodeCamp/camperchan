import { describe, assert, it } from "vitest";
import { logHandler } from "../../src/utils/logHandler.js";

describe("logHandler", () => {
  it("is defined", () => {
    assert.isDefined(logHandler, "logHandler is not defined");
    assert.isObject(logHandler, "logHandler is not an object");
  });

  it("has log function", () => {
    assert.isDefined(logHandler.log, "log is not defined");
    assert.isFunction(logHandler.log, "log is not a function");
  });
});
