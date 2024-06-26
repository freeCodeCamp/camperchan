import { describe, assert, test } from "vitest";
import { PermissionFlagsBits } from "discord.js";

import { handleAddLabels } from "../../../../src/commands/subcommands/github/handleAddLabels";

describe("add labels handler", () => {
  test("does not allow non-moderators permission", () => {
    assert.isFalse(
      handleAddLabels.permissionValidator({
        permissions: new Set([PermissionFlagsBits.SendMessages])
      } as never)
    );
  });

  test("allows moderate members permission", () => {
    assert.isTrue(
      handleAddLabels.permissionValidator({
        permissions: new Set([PermissionFlagsBits.ModerateMembers])
      } as never)
    );
  });

  test("allows kick members permission", () => {
    assert.isTrue(
      handleAddLabels.permissionValidator({
        permissions: new Set([PermissionFlagsBits.KickMembers])
      } as never)
    );
  });

  test("allows ban members permission", () => {
    assert.isTrue(
      handleAddLabels.permissionValidator({
        permissions: new Set([PermissionFlagsBits.BanMembers])
      } as never)
    );
  });
});
