import { GuildMember, PermissionResolvable } from "discord.js";

/**
 * Takes a list of moderator permissions and checks if the member has
 * any of those permissions.
 *
 * @param {GuildMember} member The member to check.
 * @returns {boolean} True if the member has at least one of the configured permissions.
 */
export const isModerator = (member: GuildMember) => {
  const modPermissions: PermissionResolvable = [
    "BAN_MEMBERS",
    "KICK_MEMBERS",
    "MODERATE_MEMBERS",
    "MANAGE_MESSAGES",
    "MANAGE_GUILD",
    "ADMINISTRATOR",
  ];
  return modPermissions.some((perm) => member.permissions.has(perm));
};
