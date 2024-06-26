import { PermissionFlagsBits } from "discord.js";
import { describe, assert, test } from "vitest";

import { handleComment } from "../../../../src/commands/subcommands/github/handleComment.js";

describe("comment command", () => {
  test("does not allow non-moderators permission", () => {
    assert.isFalse(
      handleComment.permissionValidator({
        permissions: new Set([PermissionFlagsBits.SendMessages])
      } as never)
    );
  });

  test("allows moderate members permission", () => {
    assert.isTrue(
      handleComment.permissionValidator({
        permissions: new Set([PermissionFlagsBits.ModerateMembers])
      } as never)
    );
  });

  test("allows kick members permission", () => {
    assert.isTrue(
      handleComment.permissionValidator({
        permissions: new Set([PermissionFlagsBits.KickMembers])
      } as never)
    );
  });

  test("allows ban members permission", () => {
    assert.isTrue(
      handleComment.permissionValidator({
        permissions: new Set([PermissionFlagsBits.BanMembers])
      } as never)
    );
  });
});
