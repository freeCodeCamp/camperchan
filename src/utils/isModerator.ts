import { type GuildMember, PermissionFlagsBits } from "discord.js";

/**
 * Takes a list of moderator permissions and checks if the member has
 * any of those permissions.
 * @param member - The member to check.
 * @returns True if the member has at least one of the configured permissions.
 */
export const isModerator = (member: GuildMember): boolean => {
  const modulePermissions = [
    PermissionFlagsBits.BanMembers,
    PermissionFlagsBits.KickMembers,
    PermissionFlagsBits.ModerateMembers,
    PermissionFlagsBits.ManageMessages,
    PermissionFlagsBits.ManageGuild,
    PermissionFlagsBits.Administrator,
  ];
  return modulePermissions.some((perm) => {
    return member.permissions.has(perm);
  });
};
