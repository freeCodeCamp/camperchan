import { EmbedBuilder, type GuildMember, type PartialGuildMember }
  from "discord.js";
import { errorHandler } from "../../utils/errorHandler.js";
import type { ExtendedClient } from "../../interfaces/extendedClient.js";

/**
 * Logs a message to the debug hook when someone joins the server.
 * @param camperChan - The camperChan's Discord instance.
 * @param member - The member that joined the server.
 */
export const handleMemberAdd = async(
  camperChan: ExtendedClient,
  member: GuildMember | PartialGuildMember,
): Promise<void> => {
  try {
    const embed = new EmbedBuilder();
    embed.setTitle("Member Joined");
    embed.setDescription(`<@!${member.id}> has joined the server~!`);
    embed.setAuthor({
      iconURL: member.user.displayAvatarURL(),
      name:    member.user.tag,
    });
    embed.setFooter({
      text: `ID: ${member.id}`,
    });
    await camperChan.config.welcomeHook.send({
      avatarURL: member.user.displayAvatarURL(),
      embeds:    [ embed ],
      username:  member.user.username,
    });
  } catch (error) {
    await errorHandler(camperChan, "member add event", error);
  }
};
