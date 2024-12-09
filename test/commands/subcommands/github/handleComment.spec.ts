import { PermissionFlagsBits } from "discord.js";
import { describe, assert, it } from "vitest";
import { handleComment }
  from "../../../../src/commands/subcommands/github/handleComment.js";

describe("comment command", () => {
  it("does not allow non-moderators permission", () => {
    assert.isFalse(
      handleComment.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.SendMessages ]),
      } as never),
    );
  });

  it("allows moderate members permission", () => {
    assert.isTrue(
      handleComment.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.ModerateMembers ]),
      } as never),
    );
  });

  it("allows kick members permission", () => {
    assert.isTrue(
      handleComment.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.KickMembers ]),
      } as never),
    );
  });

  it("allows ban members permission", () => {
    assert.isTrue(
      handleComment.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.BanMembers ]),
      } as never),
    );
  });
});
