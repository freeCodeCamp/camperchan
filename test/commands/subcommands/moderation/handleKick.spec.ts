import { PermissionFlagsBits } from "discord.js";
import { describe, assert, test } from "vitest";

import { handleKick } from "../../../../src/commands/subcommands/moderation/handleKick";

describe("kick handler", () => {
  test("does not allow non-moderators permission", () => {
    assert.isFalse(
      handleKick.permissionValidator({
        permissions: new Set([PermissionFlagsBits.SendMessages])
      } as never)
    );
  });

  test("does not allow moderate members permission", () => {
    assert.isFalse(
      handleKick.permissionValidator({
        permissions: new Set([PermissionFlagsBits.ModerateMembers])
      } as never)
    );
  });

  test("allows kick members permission", () => {
    assert.isTrue(
      handleKick.permissionValidator({
        permissions: new Set([PermissionFlagsBits.KickMembers])
      } as never)
    );
  });

  test("does not allow ban members permission", () => {
    assert.isFalse(
      handleKick.permissionValidator({
        permissions: new Set([PermissionFlagsBits.BanMembers])
      } as never)
    );
  });
});
