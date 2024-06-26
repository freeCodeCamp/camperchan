import { PermissionFlagsBits } from "discord.js";
import { describe, assert, test } from "vitest";

import { handlePrune } from "../../../../src/commands/subcommands/moderation/handlePrune";

describe("prune handler", () => {
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
