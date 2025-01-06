import { PermissionFlagsBits } from "discord.js";
import { describe, expect, it } from "vitest";
import { handleComment }
  from "../../../../src/commands/subcommands/github/handleComment.js";

describe("comment command", () => {
  it("does not allow non-moderators permission", () => {
    expect(handleComment.permissionValidator({
      permissions: new Set([ PermissionFlagsBits.SendMessages ]),
    } as never)).toBeFalsy();
  });

  it("allows moderate members permission", () => {
    expect(handleComment.permissionValidator({
      permissions: new Set([ PermissionFlagsBits.ModerateMembers ]),
    } as never)).toBeTruthy();
  });

  it("allows kick members permission", () => {
    expect(handleComment.permissionValidator({
      permissions: new Set([ PermissionFlagsBits.KickMembers ]),
    } as never)).toBeTruthy();
  });

  it("allows ban members permission", () => {
    expect(handleComment.permissionValidator({
      permissions: new Set([ PermissionFlagsBits.BanMembers ]),
    } as never)).toBeTruthy();
  });
});
