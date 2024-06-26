import { describe, assert, test } from "vitest";

import { handleForum } from "../../../../src/commands/subcommands/community/handleForum";

describe("forum handler", () => {
  test("is defined", () => {
    assert.isDefined(handleForum);
  });
});
