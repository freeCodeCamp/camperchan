import { assert } from "chai";
import { PermissionFlagsBits } from "discord.js";

import { handleClose } from "../../../../src/commands/subcommands/github/handleClose";

suite("close handler", () => {
  test("does not allow non-moderators permission", () => {
    assert.isFalse(
      handleClose.permissionValidator({
        permissions: new Set([PermissionFlagsBits.SendMessages]),
      } as never)
    );
  });

  test("allows moderate members permission", () => {
    assert.isTrue(
      handleClose.permissionValidator({
        permissions: new Set([PermissionFlagsBits.ModerateMembers]),
      } as never)
    );
  });

  test("allows kick members permission", () => {
    assert.isTrue(
      handleClose.permissionValidator({
        permissions: new Set([PermissionFlagsBits.KickMembers]),
      } as never)
    );
  });

  test("allows ban members permission", () => {
    assert.isTrue(
      handleClose.permissionValidator({
        permissions: new Set([PermissionFlagsBits.BanMembers]),
      } as never)
    );
  });
});
