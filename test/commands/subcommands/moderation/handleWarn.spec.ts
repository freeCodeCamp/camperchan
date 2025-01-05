import { PermissionFlagsBits } from "discord.js";
import { describe, expect, it } from "vitest";
import { handleWarn }
  from "../../../../src/commands/subcommands/moderation/handleWarn.js";

describe("warn handler", () => {
  it("does not allow non-moderators permission", () => {
    expect(handleWarn.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.SendMessages ]),
      } as never)).toBeFalsy();
  });

  it("allows moderate members permission", () => {
    expect(handleWarn.permissionValidator({
      permissions: new Set([ PermissionFlagsBits.ModerateMembers ]),
    } as never)).toBeTruthy();
  });

  it("allows kick members permission", () => {
    expect(handleWarn.permissionValidator({
      permissions: new Set([ PermissionFlagsBits.KickMembers ]),
    } as never)).toBeTruthy();
  });

  it("allows ban members permission", () => {
    expect(handleWarn.permissionValidator({
      permissions: new Set([ PermissionFlagsBits.BanMembers ]),
    } as never)).toBeTruthy();
  });
});
