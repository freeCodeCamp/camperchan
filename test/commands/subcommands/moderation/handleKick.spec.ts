import { PermissionFlagsBits } from "discord.js";
import { describe, expect, it } from "vitest";
import { handleKick }
  from "../../../../src/commands/subcommands/moderation/handleKick.js";

describe("kick handler", () => {
  it("does not allow non-moderators permission", () => {
    assert.isFalse(
      handleKick.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.SendMessages ]),
      } as never),
    );
  });

  it("does not allow moderate members permission", () => {
    assert.isFalse(
      handleKick.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.ModerateMembers ]),
      } as never),
    );
  });

  it("allows kick members permission", () => {
    assert.isTrue(
      handleKick.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.KickMembers ]),
      } as never),
    );
  });

  it("does not allow ban members permission", () => {
    assert.isFalse(
      handleKick.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.BanMembers ]),
      } as never),
    );
  });
});
