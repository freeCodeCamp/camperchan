import { assert } from "chai";
import { PermissionFlagsBits } from "discord.js";

import { handleUnban } from "../../../../src/commands/subcommands/moderation/handleUnban";

suite("unban handler", () => {
  test("does not allow non-moderators permission", () => {
    assert.isFalse(
      handleUnban.permissionValidator({
        permissions: new Set([PermissionFlagsBits.SendMessages]),
      } as never)
    );
  });

  test("does not allow moderate members permission", () => {
    assert.isFalse(
      handleUnban.permissionValidator({
        permissions: new Set([PermissionFlagsBits.ModerateMembers]),
      } as never)
    );
  });

  test("does not allow kick members permission", () => {
    assert.isFalse(
      handleUnban.permissionValidator({
        permissions: new Set([PermissionFlagsBits.KickMembers]),
      } as never)
    );
  });

  test("allows ban members permission", () => {
    assert.isTrue(
      handleUnban.permissionValidator({
        permissions: new Set([PermissionFlagsBits.BanMembers]),
      } as never)
    );
  });
});
