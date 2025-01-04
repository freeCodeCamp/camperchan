import { describe, expect, it } from "vitest";
import { fetchLearnRecord } from "../../src/utils/fetchLearnRecord.js";

describe("fetchLearnRecord", () => {
  it("is defined", () => {
    expect(fetchLearnRecord,"fetchLearnRecord is not defined").toBeDefined();
    expect(fetchLearnRecord, "fetchLearnRecord is not a function").toBeTypeOf("function");
  });
});
