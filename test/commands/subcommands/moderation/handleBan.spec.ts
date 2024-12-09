import { PermissionFlagsBits } from "discord.js";
import { describe, assert, it } from "vitest";
import { handleBan }
  from "../../../../src/commands/subcommands/moderation/handleBan.js";

describe("ban handler", () => {
  it("does not allow non-moderators permission", () => {
    assert.isFalse(
      handleBan.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.SendMessages ]),
      } as never),
    );
  });

  it("does not allow moderate members permission", () => {
    assert.isFalse(
      handleBan.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.ModerateMembers ]),
      } as never),
    );
  });

  it("does not allow kick members permission", () => {
    assert.isFalse(
      handleBan.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.KickMembers ]),
      } as never),
    );
  });

  it("allows ban members permission", () => {
    assert.isTrue(
      handleBan.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.BanMembers ]),
      } as never),
    );
  });
});
