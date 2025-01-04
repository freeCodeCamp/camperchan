import { PermissionFlagsBits } from "discord.js";
import { describe, expect, it } from "vitest";
import { handleHistory }
  from "../../../../src/commands/subcommands/moderation/handleHistory.js";

describe("history handler", () => {
  it("does not allow non-moderators permission", () => {
    assert.isFalse(
      handleHistory.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.SendMessages ]),
      } as never),
    );
  });

  it("allows moderate members permission", () => {
    assert.isTrue(
      handleHistory.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.ModerateMembers ]),
      } as never),
    );
  });

  it("allows kick members permission", () => {
    assert.isTrue(
      handleHistory.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.KickMembers ]),
      } as never),
    );
  });

  it("allows ban members permission", () => {
    assert.isTrue(
      handleHistory.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.BanMembers ]),
      } as never),
    );
  });
});
