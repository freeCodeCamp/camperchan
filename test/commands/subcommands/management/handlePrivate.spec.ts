import { assert } from "chai";
import { PermissionFlagsBits } from "discord.js";

import { handlePrivate } from "../../../../src/commands/subcommands/management/handlePrivate";

suite("handlePrivate command", () => {
  test("does not allow non-moderators permission", () => {
    assert.isFalse(
      handlePrivate.permissionValidator({
        permissions: new Set([PermissionFlagsBits.SendMessages]),
      } as never)
    );
  });

  test("allows moderate members permission", () => {
    assert.isTrue(
      handlePrivate.permissionValidator({
        permissions: new Set([PermissionFlagsBits.ModerateMembers]),
      } as never)
    );
  });

  test("allows kick members permission", () => {
    assert.isTrue(
      handlePrivate.permissionValidator({
        permissions: new Set([PermissionFlagsBits.KickMembers]),
      } as never)
    );
  });

  test("allows ban members permission", () => {
    assert.isTrue(
      handlePrivate.permissionValidator({
        permissions: new Set([PermissionFlagsBits.BanMembers]),
      } as never)
    );
  });
});
