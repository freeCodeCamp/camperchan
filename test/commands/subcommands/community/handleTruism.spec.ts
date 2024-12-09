import { describe, assert, it } from "vitest";
import { handleTruism }
  from "../../../../src/commands/subcommands/community/handleTruism.js";

describe("truism handler", () => {
  it("truism command is defined", () => {
    assert.isDefined(handleTruism);
  });
});
