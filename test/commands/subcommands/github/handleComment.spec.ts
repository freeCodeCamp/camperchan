import { assert } from "chai";
import { PermissionFlagsBits } from "discord.js";

import { handleComment } from "../../../../src/commands/subcommands/github/handleComment";

suite("comment command", () => {
  test("does not allow non-moderators permission", () => {
    assert.isFalse(
      handleComment.permissionValidator({
        permissions: new Set([PermissionFlagsBits.SendMessages]),
      } as never)
    );
  });

  test("allows moderate members permission", () => {
    assert.isTrue(
      handleComment.permissionValidator({
        permissions: new Set([PermissionFlagsBits.ModerateMembers]),
      } as never)
    );
  });

  test("allows kick members permission", () => {
    assert.isTrue(
      handleComment.permissionValidator({
        permissions: new Set([PermissionFlagsBits.KickMembers]),
      } as never)
    );
  });

  test("allows ban members permission", () => {
    assert.isTrue(
      handleComment.permissionValidator({
        permissions: new Set([PermissionFlagsBits.BanMembers]),
      } as never)
    );
  });
});
