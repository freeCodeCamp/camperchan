import { type GuildMember, PermissionFlagsBits } from "discord.js";
import { describe, expect, it } from "vitest";
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
    expect(isModerator, "isModerator is not defined").toBeDefined();
    expect(isModerator, "isModerator is not a function").toBeTypeOf("function");
  });

  it("returns true when moderator", () => {
    expect(isModerator(kickMembersSet), "isModerator returned false").toBeTruthy();
    expect(isModerator(banMembersSet), "isModerator returned false").toBeTruthy();
    expect(isModerator(manageMessagesSet), "isModerator returned false").toBeTruthy();
    assert.isTrue(
      isModerator(moderateMembersSet),
      "isModerator returned false",
    );
  });

  it("returns false when not moderator", () => {
    expect(isModerator(typeCoerce({ permissions: new Set(basePermissions) }))).toBeFalsy();
  });
});
