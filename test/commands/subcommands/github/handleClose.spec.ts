import { PermissionFlagsBits } from "discord.js";
import { describe, expect, it } from "vitest";
import { handleClose }
  from "../../../../src/commands/subcommands/github/handleClose.js";

describe("close handler", () => {
  it("does not allow non-moderators permission", () => {
    assert.isFalse(
      handleClose.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.SendMessages ]),
      } as never),
    );
  });

  it("allows moderate members permission", () => {
    assert.isTrue(
      handleClose.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.ModerateMembers ]),
      } as never),
    );
  });

  it("allows kick members permission", () => {
    assert.isTrue(
      handleClose.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.KickMembers ]),
      } as never),
    );
  });

  it("allows ban members permission", () => {
    assert.isTrue(
      handleClose.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.BanMembers ]),
      } as never),
    );
  });
});
