import { describe, it, expect } from "vitest";
import { connectDatabase } from "../../src/database/connectDatabase.js";

describe("connectDatabase", () => {
  it("should be defined", () => {
    expect(connectDatabase, "connectDatabase is not defined").toBeDefined();
    expect(connectDatabase, "connectDatabase is not a function").toBeTypeOf("function");
  });
});
