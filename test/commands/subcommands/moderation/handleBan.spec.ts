import { PermissionFlagsBits } from "discord.js";
import { describe, expect, it } from "vitest";
import { handleBan }
  from "../../../../src/commands/subcommands/moderation/handleBan.js";

describe("ban handler", () => {
  it("does not allow non-moderators permission", () => {
    expect(handleBan.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.SendMessages ]),
      } as never)).toBeFalsy();
  });

  it("does not allow moderate members permission", () => {
    expect(handleBan.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.ModerateMembers ]),
      } as never)).toBeFalsy();
  });

  it("does not allow kick members permission", () => {
    expect(handleBan.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.KickMembers ]),
      } as never)).toBeFalsy();
  });

  it("allows ban members permission", () => {
    expect(handleBan.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.BanMembers ]),
      } as never)).toBeTruthy();
  });
});
