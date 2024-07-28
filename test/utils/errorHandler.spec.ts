import { describe, assert, test } from "vitest";
import { errorHandler } from "../../src/utils/errorHandler.js";

describe("errorHandler", () => {
  test("is defined", () => {
    assert.isDefined(errorHandler, "errorHandler is not defined");
    assert.isFunction(errorHandler, "errorHandler is not a function");
  });
});
