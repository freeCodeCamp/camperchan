import { PermissionFlagsBits } from "discord.js";
import { describe, expect, it } from "vitest";
import { handlePrivate }
  from "../../../../src/commands/subcommands/management/handlePrivate.js";

describe("handlePrivate command", () => {
  it("does not allow non-moderators permission", () => {
    expect(handlePrivate.permissionValidator({
      permissions: new Set([ PermissionFlagsBits.SendMessages ]),
    } as never)).toBeFalsy();
  });

  it("allows moderate members permission", () => {
    expect(handlePrivate.permissionValidator({
      permissions: new Set([ PermissionFlagsBits.ModerateMembers ]),
    } as never)).toBeTruthy();
  });

  it("allows kick members permission", () => {
    expect(handlePrivate.permissionValidator({
      permissions: new Set([ PermissionFlagsBits.KickMembers ]),
    } as never)).toBeTruthy();
  });

  it("allows ban members permission", () => {
    expect(handlePrivate.permissionValidator({
      permissions: new Set([ PermissionFlagsBits.BanMembers ]),
    } as never)).toBeTruthy();
  });
});
