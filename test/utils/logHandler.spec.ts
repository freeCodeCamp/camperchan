import { assert } from "chai";

import { logHandler } from "../../src/utils/logHandler";

suite("logHandler", () => {
  test("is defined", () => {
    assert.isDefined(logHandler, "logHandler is not defined");
    assert.isObject(logHandler, "logHandler is not an object");
  });

  test("has log function", () => {
    assert.isDefined(logHandler.log, "log is not defined");
    assert.isFunction(logHandler.log, "log is not a function");
  });
});
