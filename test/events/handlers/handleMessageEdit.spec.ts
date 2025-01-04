import { describe, expect, it } from "vitest";
import { handleMessageEdit }
  from "../../../src/events/handlers/handleMessageEdit.js";

describe("handleMessageEdit", () => {
  it("handleMessageEdit is a function", () => {
    expect(handleMessageEdit).toBeTypeOf("function");
  });
});
