import { PermissionFlagsBits } from "discord.js";
import { describe, assert, test } from "vitest";

import { handleBan } from "../../../../src/commands/subcommands/moderation/handleBan";

describe("ban handler", () => {
  test("does not allow non-moderators permission", () => {
    assert.isFalse(
      handleBan.permissionValidator({
        permissions: new Set([PermissionFlagsBits.SendMessages])
      } as never)
    );
  });

  test("does not allow moderate members permission", () => {
    assert.isFalse(
      handleBan.permissionValidator({
        permissions: new Set([PermissionFlagsBits.ModerateMembers])
      } as never)
    );
  });

  test("does not allow kick members permission", () => {
    assert.isFalse(
      handleBan.permissionValidator({
        permissions: new Set([PermissionFlagsBits.KickMembers])
      } as never)
    );
  });

  test("allows ban members permission", () => {
    assert.isTrue(
      handleBan.permissionValidator({
        permissions: new Set([PermissionFlagsBits.BanMembers])
      } as never)
    );
  });
});
