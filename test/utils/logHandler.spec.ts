import { describe, assert, test } from "vitest";

import { logHandler } from "../../src/utils/logHandler";

describe("logHandler", () => {
  test("is defined", () => {
    assert.isDefined(logHandler, "logHandler is not defined");
    assert.isObject(logHandler, "logHandler is not an object");
  });

  test("has log function", () => {
    assert.isDefined(logHandler.log, "log is not defined");
    assert.isFunction(logHandler.log, "log is not a function");
  });
});
