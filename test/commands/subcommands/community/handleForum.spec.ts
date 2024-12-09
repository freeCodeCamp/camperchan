import { describe, assert, it } from "vitest";
import { handleForum }
  from "../../../../src/commands/subcommands/community/handleForum.js";

describe("forum handler", () => {
  it("is defined", () => {
    assert.isDefined(handleForum);
  });
});
