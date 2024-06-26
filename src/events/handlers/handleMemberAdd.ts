import { EmbedBuilder, GuildMember, PartialGuildMember } from "discord.js";

import { ExtendedClient } from "../../interfaces/ExtendedClient.js";
import { errorHandler } from "../../utils/errorHandler.js";

/**
 * Logs a message to the debug hook when someone joins the server.
 *
 * @param {ExtendedClient} CamperChan The CamperChan's Discord instance.
 * @param {GuildMember | PartialGuildMember} member The member that joined the server.
 */
export const handleMemberAdd = async (
  CamperChan: ExtendedClient,
  member: GuildMember | PartialGuildMember
) => {
  try {
    if (!member.user) {
      return;
    }
    const embed = new EmbedBuilder();
    embed.setTitle("Member Joined");
    embed.setDescription(`<@!${member.id}> has joined the server~!`);
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
    await errorHandler(CamperChan, "member add event", err);
  }
};
