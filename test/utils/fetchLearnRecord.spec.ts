import { assert } from "chai";

import { fetchLearnRecord } from "../../src/utils/fetchLearnRecord";

suite("fetchLearnRecord", () => {
  test("is defined", () => {
    assert.isDefined(fetchLearnRecord, "fetchLearnRecord is not defined");
    assert.isFunction(fetchLearnRecord, "fetchLearnRecord is not a function");
  });
});
