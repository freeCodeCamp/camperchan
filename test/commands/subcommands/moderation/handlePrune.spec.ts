import { PermissionFlagsBits } from "discord.js";
import { describe, expect, it } from "vitest";
import { handlePrune }
  from "../../../../src/commands/subcommands/moderation/handlePrune.js";

describe("prune handler", () => {
  it("does not allow non-moderators permission", () => {
    expect(handlePrune.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.SendMessages ]),
      } as never)).toBeFalsy();
  });

  it("allows manage messages permission", () => {
    expect(handlePrune.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.ManageMessages ]),
      } as never)).toBeTruthy();
  });

  it("does not allow moderate members permission", () => {
    expect(handlePrune.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.ModerateMembers ]),
      } as never)).toBeFalsy();
  });

  it("does not allow kick members permission", () => {
    expect(handlePrune.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.KickMembers ]),
      } as never)).toBeFalsy();
  });

  it("does not allow ban members permission", () => {
    expect(handlePrune.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.BanMembers ]),
      } as never)).toBeFalsy();
  });
});
