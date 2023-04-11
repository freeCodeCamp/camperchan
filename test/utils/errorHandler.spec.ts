import { assert } from "chai";

import { errorHandler } from "../../src/utils/errorHandler";

suite("errorHandler", () => {
  test("is defined", () => {
    assert.isDefined(errorHandler, "errorHandler is not defined");
    assert.isFunction(errorHandler, "errorHandler is not a function");
  });
});
