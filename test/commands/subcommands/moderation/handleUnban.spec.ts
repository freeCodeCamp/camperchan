import { PermissionFlagsBits } from "discord.js";
import { describe, expect, it } from "vitest";
import { handleUnban }
  from "../../../../src/commands/subcommands/moderation/handleUnban.js";

describe("unban handler", () => {
  it("does not allow non-moderators permission", () => {
    expect(handleUnban.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.SendMessages ]),
      } as never)).toBeFalsy();
  });

  it("does not allow moderate members permission", () => {
    expect(handleUnban.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.ModerateMembers ]),
      } as never)).toBeFalsy();
  });

  it("does not allow kick members permission", () => {
    expect(handleUnban.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.KickMembers ]),
      } as never)).toBeFalsy();
  });

  it("allows ban members permission", () => {
    expect(handleUnban.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.BanMembers ]),
      } as never)).toBeTruthy();
  });
});
