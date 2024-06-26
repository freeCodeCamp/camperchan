import { PermissionFlagsBits } from "discord.js";
import { describe, assert, test } from "vitest";

import { handleWarn } from "../../../../src/commands/subcommands/moderation/handleWarn.js";

describe("warn handler", () => {
  test("does not allow non-moderators permission", () => {
    assert.isFalse(
      handleWarn.permissionValidator({
        permissions: new Set([PermissionFlagsBits.SendMessages])
      } as never)
    );
  });

  test("allows moderate members permission", () => {
    assert.isTrue(
      handleWarn.permissionValidator({
        permissions: new Set([PermissionFlagsBits.ModerateMembers])
      } as never)
    );
  });

  test("allows kick members permission", () => {
    assert.isTrue(
      handleWarn.permissionValidator({
        permissions: new Set([PermissionFlagsBits.KickMembers])
      } as never)
    );
  });

  test("allows ban members permission", () => {
    assert.isTrue(
      handleWarn.permissionValidator({
        permissions: new Set([PermissionFlagsBits.BanMembers])
      } as never)
    );
  });
});
