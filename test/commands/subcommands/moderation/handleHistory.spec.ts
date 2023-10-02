import { assert } from "chai";
import { PermissionFlagsBits } from "discord.js";

import { handleHistory } from "../../../../src/commands/subcommands/moderation/handleHistory";

suite("history handler", () => {
  test("does not allow non-moderators permission", () => {
    assert.isFalse(
      handleHistory.permissionValidator({
        permissions: new Set([PermissionFlagsBits.SendMessages]),
      } as never)
    );
  });

  test("allows moderate members permission", () => {
    assert.isTrue(
      handleHistory.permissionValidator({
        permissions: new Set([PermissionFlagsBits.ModerateMembers]),
      } as never)
    );
  });

  test("allows kick members permission", () => {
    assert.isTrue(
      handleHistory.permissionValidator({
        permissions: new Set([PermissionFlagsBits.KickMembers]),
      } as never)
    );
  });

  test("allows ban members permission", () => {
    assert.isTrue(
      handleHistory.permissionValidator({
        permissions: new Set([PermissionFlagsBits.BanMembers]),
      } as never)
    );
  });
});
