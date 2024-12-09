import { PermissionFlagsBits } from "discord.js";
import { describe, assert, it } from "vitest";
import { handleAddLabels }
  from "../../../../src/commands/subcommands/github/handleAddLabels.js";

describe("add labels handler", () => {
  it("does not allow non-moderators permission", () => {
    assert.isFalse(
      handleAddLabels.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.SendMessages ]),
      } as never),
    );
  });

  it("allows moderate members permission", () => {
    assert.isTrue(
      handleAddLabels.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.ModerateMembers ]),
      } as never),
    );
  });

  it("allows kick members permission", () => {
    assert.isTrue(
      handleAddLabels.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.KickMembers ]),
      } as never),
    );
  });

  it("allows ban members permission", () => {
    assert.isTrue(
      handleAddLabels.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.BanMembers ]),
      } as never),
    );
  });
});
