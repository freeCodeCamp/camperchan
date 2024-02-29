import { assert } from "chai";
import { PermissionFlagsBits } from "discord.js";

import { handleKick } from "../../../../src/commands/subcommands/moderation/handleKick";

suite("kick handler", () => {
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
