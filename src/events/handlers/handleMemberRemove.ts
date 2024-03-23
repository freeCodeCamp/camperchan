import { EmbedBuilder, GuildMember, PartialGuildMember } from "discord.js";

import { ExtendedClient } from "../../interfaces/ExtendedClient";
import { errorHandler } from "../../utils/errorHandler";

/**
 * Logs a message to the debug hook when someone leaves the server.
 *
 * @param {ExtendedClient} CamperChan The CamperChan's Discord instance.
 * @param {GuildMember | PartialGuildMember} member The member that left the server.
 */
export const handleMemberRemove = async (
  CamperChan: ExtendedClient,
  member: GuildMember | PartialGuildMember
) => {
  try {
    if (!member.user) {
      return;
    }
    const embed = new EmbedBuilder();
    embed.setTitle("Member Left");
    embed.setDescription(`<@!${member.id}> has left the server~!`);
    embed.addFields([
      {
        name: "Roles",
        value:
          member.roles?.cache
            .map((role) =>
              role.id === member.guild.id ? role.name : `<@&${role.id}>`
            )
            .join(", ") || "unknown"
      }
    ]);
    embed.setAuthor({
      name: member.user.tag,
      iconURL: member.user.displayAvatarURL()
    });
    embed.setFooter({
      text: `ID: ${member.id}`
    });
    await CamperChan.config.welcomeHook.send({
      embeds: [embed],
      username: member.user.username,
      avatarURL: member.user.displayAvatarURL()
    });
  } catch (err) {
    await errorHandler(CamperChan, "member remove event", err);
  }
};
