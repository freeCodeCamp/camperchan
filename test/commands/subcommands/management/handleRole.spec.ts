import { PermissionFlagsBits } from "discord.js";
import { describe, expect, it } from "vitest";
import { handleRole }
  from "../../../../src/commands/subcommands/management/handleRole.js";

describe("handleRole command", () => {
  it("does not allow non-moderators permission", () => {
    expect(handleRole.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.SendMessages ]),
      } as never)).toBeFalsy();
  });

  it("does not allow moderate members permission", () => {
    expect(handleRole.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.ModerateMembers ]),
      } as never)).toBeFalsy();
  });

  it("does not allow kick members permission", () => {
    expect(handleRole.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.KickMembers ]),
      } as never)).toBeFalsy();
  });

  it("does not allow ban members permission", () => {
    expect(handleRole.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.BanMembers ]),
      } as never)).toBeFalsy();
  });

  it("allows manage server permission", () => {
    expect(handleRole.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.ManageGuild ]),
      } as never)).toBeTruthy();
  });
});
