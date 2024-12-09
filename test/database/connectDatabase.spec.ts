import { describe, assert, it } from "vitest";
import { connectDatabase } from "../../src/database/connectDatabase.js";

describe("connectDatabase", () => {
  it("should be defined", () => {
    assert.isDefined(connectDatabase, "connectDatabase is not defined");
    assert.isFunction(connectDatabase, "connectDatabase is not a function");
  });
});
