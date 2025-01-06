import { PermissionFlagsBits } from "discord.js";
import { describe, expect, it } from "vitest";
import { handleUnmute }
  from "../../../../src/commands/subcommands/moderation/handleUnmute.js";

describe("unmute handler", () => {
  it("does not allow non-moderators permission", () => {
    expect(handleUnmute.permissionValidator({
      permissions: new Set([ PermissionFlagsBits.SendMessages ]),
    } as never)).toBeFalsy();
  });

  it("allows moderate members permission", () => {
    expect(handleUnmute.permissionValidator({
      permissions: new Set([ PermissionFlagsBits.ModerateMembers ]),
    } as never)).toBeTruthy();
  });

  it("does not allow kick members permission", () => {
    expect(handleUnmute.permissionValidator({
      permissions: new Set([ PermissionFlagsBits.KickMembers ]),
    } as never)).toBeFalsy();
  });

  it("does not allow ban members permission", () => {
    expect(handleUnmute.permissionValidator({
      permissions: new Set([ PermissionFlagsBits.BanMembers ]),
    } as never)).toBeFalsy();
  });
});
