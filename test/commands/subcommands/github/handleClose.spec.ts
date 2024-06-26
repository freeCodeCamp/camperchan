import { PermissionFlagsBits } from "discord.js";
import { describe, assert, test } from "vitest";

import { handleClose } from "../../../../src/commands/subcommands/github/handleClose";

describe("close handler", () => {
  test("does not allow non-moderators permission", () => {
    assert.isFalse(
      handleClose.permissionValidator({
        permissions: new Set([PermissionFlagsBits.SendMessages])
      } as never)
    );
  });

  test("allows moderate members permission", () => {
    assert.isTrue(
      handleClose.permissionValidator({
        permissions: new Set([PermissionFlagsBits.ModerateMembers])
      } as never)
    );
  });

  test("allows kick members permission", () => {
    assert.isTrue(
      handleClose.permissionValidator({
        permissions: new Set([PermissionFlagsBits.KickMembers])
      } as never)
    );
  });

  test("allows ban members permission", () => {
    assert.isTrue(
      handleClose.permissionValidator({
        permissions: new Set([PermissionFlagsBits.BanMembers])
      } as never)
    );
  });
});
