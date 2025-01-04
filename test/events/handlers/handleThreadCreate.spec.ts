import { describe, expect, it } from "vitest";
import { handleThreadCreate }
  from "../../../src/events/handlers/handleThreadCreate.js";

describe("handleThreadCreate", () => {
  it("handleThreadCreate is a function", () => {
    expect(handleThreadCreate).toBeTypeOf("function");
  });
});
