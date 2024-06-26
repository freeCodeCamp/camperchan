import { describe, assert, test } from "vitest";

import { handleTruism } from "../../../../src/commands/subcommands/community/handleTruism";

describe("truism handler", () => {
  test("truism command is defined", () => {
    assert.isDefined(handleTruism);
  });
});
