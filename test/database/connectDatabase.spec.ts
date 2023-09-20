import { assert } from "chai";

import { connectDatabase } from "../../src/database/connectDatabase";

suite("connectDatabase", () => {
  test("should be defined", () => {
    assert.isDefined(connectDatabase, "connectDatabase is not defined");
    assert.isFunction(connectDatabase, "connectDatabase is not a function");
  });
});
