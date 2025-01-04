import { describe, expect, it } from "vitest";
import { handleVoiceStateUpdate }
  from "../../../src/events/handlers/handleVoiceStateUpdate.js";

describe("handleVoiceStateUpdate", () => {
  it("handleVoiceStateUpdate is a function", () => {
    expect(handleVoiceStateUpdate).toBeTypeOf("function");
  });
});
