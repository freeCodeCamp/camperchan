import { PermissionFlagsBits } from "discord.js";
import { describe, expect, it } from "vitest";
import { handleHistory }
  from "../../../../src/commands/subcommands/moderation/handleHistory.js";

describe("history handler", () => {
  it("does not allow non-moderators permission", () => {
    expect(handleHistory.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.SendMessages ]),
      } as never)).toBeFalsy();
  });

  it("allows moderate members permission", () => {
    expect(handleHistory.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.ModerateMembers ]),
      } as never)).toBeTruthy();
  });

  it("allows kick members permission", () => {
    expect(handleHistory.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.KickMembers ]),
      } as never)).toBeTruthy();
  });

  it("allows ban members permission", () => {
    expect(handleHistory.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.BanMembers ]),
      } as never)).toBeTruthy();
  });
});
