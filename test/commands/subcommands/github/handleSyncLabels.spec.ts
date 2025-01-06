import { PermissionFlagsBits } from "discord.js";
import { describe, expect, it } from "vitest";
import { handleSyncLabels }
  from "../../../../src/commands/subcommands/github/handleSyncLabels.js";

describe("sync labels handler", () => {
  it("does not allow non-moderators permission", () => {
    expect(handleSyncLabels.permissionValidator({
      permissions: new Set([ PermissionFlagsBits.SendMessages ]),
    } as never)).toBeFalsy();
  });

  it("allows moderate members permission", () => {
    expect(handleSyncLabels.permissionValidator({
      permissions: new Set([ PermissionFlagsBits.ModerateMembers ]),
    } as never)).toBeTruthy();
  });

  it("allows kick members permission", () => {
    expect(handleSyncLabels.permissionValidator({
      permissions: new Set([ PermissionFlagsBits.KickMembers ]),
    } as never)).toBeTruthy();
  });

  it("allows ban members permission", () => {
    expect(handleSyncLabels.permissionValidator({
      permissions: new Set([ PermissionFlagsBits.BanMembers ]),
    } as never)).toBeTruthy();
  });
});
