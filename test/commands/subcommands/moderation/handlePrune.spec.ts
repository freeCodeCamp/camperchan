import { PermissionFlagsBits } from "discord.js";
import { describe, expect, it } from "vitest";
import { handlePrune }
  from "../../../../src/commands/subcommands/moderation/handlePrune.js";

describe("prune handler", () => {
  it("does not allow non-moderators permission", () => {
    assert.isFalse(
      handlePrune.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.SendMessages ]),
      } as never),
    );
  });

  it("allows manage messages permission", () => {
    assert.isTrue(
      handlePrune.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.ManageMessages ]),
      } as never),
    );
  });

  it("does not allow moderate members permission", () => {
    assert.isFalse(
      handlePrune.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.ModerateMembers ]),
      } as never),
    );
  });

  it("does not allow kick members permission", () => {
    assert.isFalse(
      handlePrune.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.KickMembers ]),
      } as never),
    );
  });

  it("does not allow ban members permission", () => {
    assert.isFalse(
      handlePrune.permissionValidator({
        permissions: new Set([ PermissionFlagsBits.BanMembers ]),
      } as never),
    );
  });
});
