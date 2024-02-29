import { assert } from "chai";
import { PermissionFlagsBits } from "discord.js";

import { handlePrune } from "../../../../src/commands/subcommands/moderation/handlePrune";

suite("prune handler", () => {
  test("does not allow non-moderators permission", () => {
    assert.isFalse(
      handlePrune.permissionValidator({
        permissions: new Set([PermissionFlagsBits.SendMessages])
      } as never)
    );
  });

  test("allows manage messages permission", () => {
    assert.isTrue(
      handlePrune.permissionValidator({
        permissions: new Set([PermissionFlagsBits.ManageMessages])
      } as never)
    );
  });

  test("does not allow moderate members permission", () => {
    assert.isFalse(
      handlePrune.permissionValidator({
        permissions: new Set([PermissionFlagsBits.ModerateMembers])
      } as never)
    );
  });

  test("does not allow kick members permission", () => {
    assert.isFalse(
      handlePrune.permissionValidator({
        permissions: new Set([PermissionFlagsBits.KickMembers])
      } as never)
    );
  });

  test("does not allow ban members permission", () => {
    assert.isFalse(
      handlePrune.permissionValidator({
        permissions: new Set([PermissionFlagsBits.BanMembers])
      } as never)
    );
  });
});
