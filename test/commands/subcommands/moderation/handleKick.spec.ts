import { PermissionFlagsBits } from "discord.js";
import { describe, expect, it } from "vitest";
import { handleKick }
  from "../../../../src/commands/subcommands/moderation/handleKick.js";

describe("kick handler", () => {
  it("does not allow non-moderators permission", () => {
    expect(handleKick.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.SendMessages ]),
      } as never)).toBeFalsy();
  });

  it("does not allow moderate members permission", () => {
    expect(handleKick.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.ModerateMembers ]),
      } as never)).toBeFalsy();
  });

  it("allows kick members permission", () => {
    expect(handleKick.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.KickMembers ]),
      } as never)).toBeTruthy();
  });

  it("does not allow ban members permission", () => {
    expect(handleKick.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.BanMembers ]),
      } as never)).toBeFalsy();
  });
});
