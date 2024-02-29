import { assert } from "chai";
import { PermissionFlagsBits } from "discord.js";

import { handleRole } from "../../../../src/commands/subcommands/management/handleRole";

suite("handleRole command", () => {
  test("does not allow non-moderators permission", () => {
    assert.isFalse(
      handleRole.permissionValidator({
        permissions: new Set([PermissionFlagsBits.SendMessages])
      } as never)
    );
  });

  test("does not allow moderate members permission", () => {
    assert.isFalse(
      handleRole.permissionValidator({
        permissions: new Set([PermissionFlagsBits.ModerateMembers])
      } as never)
    );
  });

  test("does not allow kick members permission", () => {
    assert.isFalse(
      handleRole.permissionValidator({
        permissions: new Set([PermissionFlagsBits.KickMembers])
      } as never)
    );
  });

  test("does not allow ban members permission", () => {
    assert.isFalse(
      handleRole.permissionValidator({
        permissions: new Set([PermissionFlagsBits.BanMembers])
      } as never)
    );
  });

  test("allows manage server permission", () => {
    assert.isTrue(
      handleRole.permissionValidator({
        permissions: new Set([PermissionFlagsBits.ManageGuild])
      } as never)
    );
  });
});
