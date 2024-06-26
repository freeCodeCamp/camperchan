import { describe, assert, test } from "vitest";

import { handleTruism } from "../../../../src/commands/subcommands/community/handleTruism.js";

describe("truism handler", () => {
  test("truism command is defined", () => {
    assert.isDefined(handleTruism);
  });
});
