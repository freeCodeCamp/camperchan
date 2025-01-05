import { PermissionFlagsBits } from "discord.js";
import { describe, expect, it } from "vitest";
import { handleMute }
  from "../../../../src/commands/subcommands/moderation/handleMute.js";

describe("mute handler", () => {
  it("does not allow non-moderators permission", () => {
    expect(handleMute.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.SendMessages ]),
      } as never)).toBeFalsy();
  });

  it("allows moderate members permission", () => {
    expect(handleMute.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.ModerateMembers ]),
      } as never)).toBeTruthy();
  });

  it("does not allow kick members permission", () => {
    expect(handleMute.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.KickMembers ]),
      } as never)).toBeFalsy();
  });

  it("does not allow ban members permission", () => {
    expect(handleMute.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.BanMembers ]),
      } as never)).toBeFalsy();
  });
});
