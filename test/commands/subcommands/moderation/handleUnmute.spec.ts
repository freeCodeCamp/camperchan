import { PermissionFlagsBits } from "discord.js";
import { describe, expect, it } from "vitest";
import { handleUnmute }
  from "../../../../src/commands/subcommands/moderation/handleUnmute.js";

describe("unmute handler", () => {
  it("does not allow non-moderators permission", () => {
    assert.isFalse(
      handleUnmute.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.SendMessages ]),
      } as never),
    );
  });

  it("allows moderate members permission", () => {
    assert.isTrue(
      handleUnmute.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.ModerateMembers ]),
      } as never),
    );
  });

  it("does not allow kick members permission", () => {
    assert.isFalse(
      handleUnmute.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.KickMembers ]),
      } as never),
    );
  });

  it("does not allow ban members permission", () => {
    assert.isFalse(
      handleUnmute.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.BanMembers ]),
      } as never),
    );
  });
});
