import { describe, assert, it } from "vitest";
import { fetchLearnRecord } from "../../src/utils/fetchLearnRecord.js";

describe("fetchLearnRecord", () => {
  it("is defined", () => {
    assert.isDefined(fetchLearnRecord, "fetchLearnRecord is not defined");
    assert.isFunction(fetchLearnRecord, "fetchLearnRecord is not a function");
  });
});
