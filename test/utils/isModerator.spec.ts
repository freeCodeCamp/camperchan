import { type GuildMember, PermissionFlagsBits } from "discord.js";
import { describe, assert, it } from "vitest";
import { isModerator } from "../../src/utils/isModerator.js";

const typeCoerce = (object: unknown): GuildMember => {
  return object as GuildMember;
};

const basePermissions = [
  PermissionFlagsBits.ViewChannel,
  PermissionFlagsBits.SendMessages,
];
const kickMembersSet = typeCoerce({
  permissions: new Set([ PermissionFlagsBits.KickMembers, ...basePermissions ]),
});
const banMembersSet = typeCoerce({
  permissions: new Set([ PermissionFlagsBits.BanMembers, ...basePermissions ]),
});
const manageMessagesSet = typeCoerce({
  permissions: new Set(
    [ PermissionFlagsBits.ManageMessages, ...basePermissions ],
  ),
});
const moderateMembersSet = typeCoerce({
  permissions: new Set([
    PermissionFlagsBits.ModerateMembers,
    ...basePermissions,
  ]),
});

describe("isModerator", () => {
  it("is defined", () => {
    assert.isDefined(isModerator, "isModerator is not defined");
    assert.isFunction(isModerator, "isModerator is not a function");
  });

  it("returns true when moderator", () => {
    assert.isTrue(isModerator(kickMembersSet), "isModerator returned false");
    assert.isTrue(isModerator(banMembersSet), "isModerator returned false");
    assert.isTrue(isModerator(manageMessagesSet), "isModerator returned false");
    assert.isTrue(
      isModerator(moderateMembersSet),
      "isModerator returned false",
    );
  });

  it("returns false when not moderator", () => {
    assert.isFalse(
      isModerator(typeCoerce({ permissions: new Set(basePermissions) })),
    );
  });
});
