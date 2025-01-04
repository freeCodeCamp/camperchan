import { PermissionFlagsBits } from "discord.js";
import { describe, expect, it } from "vitest";
import { handleRole }
  from "../../../../src/commands/subcommands/management/handleRole.js";

describe("handleRole command", () => {
  it("does not allow non-moderators permission", () => {
    assert.isFalse(
      handleRole.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.SendMessages ]),
      } as never),
    );
  });

  it("does not allow moderate members permission", () => {
    assert.isFalse(
      handleRole.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.ModerateMembers ]),
      } as never),
    );
  });

  it("does not allow kick members permission", () => {
    assert.isFalse(
      handleRole.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.KickMembers ]),
      } as never),
    );
  });

  it("does not allow ban members permission", () => {
    assert.isFalse(
      handleRole.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.BanMembers ]),
      } as never),
    );
  });

  it("allows manage server permission", () => {
    assert.isTrue(
      handleRole.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.ManageGuild ]),
      } as never),
    );
  });
});
