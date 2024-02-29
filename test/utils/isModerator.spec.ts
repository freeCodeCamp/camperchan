import { assert } from "chai";
import { GuildMember, PermissionFlagsBits } from "discord.js";

import { isModerator } from "../../src/utils/isModerator";

const typeCoerce = (obj: unknown) => obj as GuildMember;

const basePermissions = [
  PermissionFlagsBits.ViewChannel,
  PermissionFlagsBits.SendMessages
];
const kickMembersSet = typeCoerce({
  permissions: new Set([PermissionFlagsBits.KickMembers, ...basePermissions])
});
const banMembersSet = typeCoerce({
  permissions: new Set([PermissionFlagsBits.BanMembers, ...basePermissions])
});
const manageMessagesSet = typeCoerce({
  permissions: new Set([PermissionFlagsBits.ManageMessages, ...basePermissions])
});
const moderateMembersSet = typeCoerce({
  permissions: new Set([
    PermissionFlagsBits.ModerateMembers,
    ...basePermissions
  ])
});

suite("isModerator", () => {
  test("is defined", () => {
    assert.isDefined(isModerator, "isModerator is not defined");
    assert.isFunction(isModerator, "isModerator is not a function");
  });

  test("returns true when moderator", () => {
    assert.isTrue(isModerator(kickMembersSet), "isModerator returned false");
    assert.isTrue(isModerator(banMembersSet), "isModerator returned false");
    assert.isTrue(isModerator(manageMessagesSet), "isModerator returned false");
    assert.isTrue(
      isModerator(moderateMembersSet),
      "isModerator returned false"
    );
  });

  test("returns false when not moderator", () => {
    assert.isFalse(
      isModerator(typeCoerce({ permissions: new Set(basePermissions) }))
    );
  });
});
