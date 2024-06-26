import { describe, assert, test } from "vitest";

import { handleForum } from "../../../../src/commands/subcommands/community/handleForum.js";

describe("forum handler", () => {
  test("is defined", () => {
    assert.isDefined(handleForum);
  });
});
