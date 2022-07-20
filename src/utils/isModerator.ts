import { GuildMember, PermissionFlagsBits } from "discord.js";

/**
 * Takes a list of moderator permissions and checks if the member has
 * any of those permissions.
 *
 * @param {GuildMember} member The member to check.
 * @returns {boolean} True if the member has at least one of the configured permissions.
 */
export const isModerator = (member: GuildMember) => {
  const modPermissions = [
    PermissionFlagsBits.BanMembers,
    PermissionFlagsBits.KickMembers,
    PermissionFlagsBits.ModerateMembers,
    PermissionFlagsBits.ManageMessages,
    PermissionFlagsBits.ManageGuild,
    PermissionFlagsBits.Administrator,
  ];
  return modPermissions.some((perm) => member.permissions.has(perm));
};
