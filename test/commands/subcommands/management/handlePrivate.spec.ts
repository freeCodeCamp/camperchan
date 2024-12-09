import { PermissionFlagsBits } from "discord.js";
import { describe, assert, it } from "vitest";
import { handlePrivate }
  from "../../../../src/commands/subcommands/management/handlePrivate.js";

describe("handlePrivate command", () => {
  it("does not allow non-moderators permission", () => {
    assert.isFalse(
      handlePrivate.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.SendMessages ]),
      } as never),
    );
  });

  it("allows moderate members permission", () => {
    assert.isTrue(
      handlePrivate.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.ModerateMembers ]),
      } as never),
    );
  });

  it("allows kick members permission", () => {
    assert.isTrue(
      handlePrivate.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.KickMembers ]),
      } as never),
    );
  });

  it("allows ban members permission", () => {
    assert.isTrue(
      handlePrivate.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.BanMembers ]),
      } as never),
    );
  });
});
