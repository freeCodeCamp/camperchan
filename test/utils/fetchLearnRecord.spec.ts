import { describe, assert, test } from "vitest";
import { fetchLearnRecord } from "../../src/utils/fetchLearnRecord.js";

describe("fetchLearnRecord", () => {
  test("is defined", () => {
    assert.isDefined(fetchLearnRecord, "fetchLearnRecord is not defined");
    assert.isFunction(fetchLearnRecord, "fetchLearnRecord is not a function");
  });
});
