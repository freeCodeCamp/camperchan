import { describe, assert, test } from "vitest";

import { isGuildCommandInteraction } from "../../src/utils/typeGuards";

describe("isGuildCommand", () => {
  const interaction = {};
  test("should return false when guild is missing", () => {
    assert.isFalse(isGuildCommandInteraction(interaction as never));
  });

  test("should return false when member is missing", () => {
    // @ts-expect-error suppress error for testing assignment
    interaction.guild = {};
    assert.isFalse(isGuildCommandInteraction(interaction as never));
  });

  test("should return false when member.permissions is a string", () => {
    // @ts-expect-error suppress error for testing assignment
    interaction.member = { permissions: "0" };
    assert.isFalse(isGuildCommandInteraction(interaction as never));
  });

  test("should return true when guild and member are present", () => {
    // @ts-expect-error suppress error for testing assignment
    interaction.member = { permissions: {} };
    assert.isTrue(isGuildCommandInteraction(interaction as never));
  });
});
