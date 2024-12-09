import { PermissionFlagsBits } from "discord.js";
import { describe, assert, it } from "vitest";
import { handleMute }
  from "../../../../src/commands/subcommands/moderation/handleMute.js";

describe("mute handler", () => {
  it("does not allow non-moderators permission", () => {
    assert.isFalse(
      handleMute.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.SendMessages ]),
      } as never),
    );
  });

  it("allows moderate members permission", () => {
    assert.isTrue(
      handleMute.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.ModerateMembers ]),
      } as never),
    );
  });

  it("does not allow kick members permission", () => {
    assert.isFalse(
      handleMute.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.KickMembers ]),
      } as never),
    );
  });

  it("does not allow ban members permission", () => {
    assert.isFalse(
      handleMute.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.BanMembers ]),
      } as never),
    );
  });
});
