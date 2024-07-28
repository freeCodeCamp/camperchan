import { EmbedBuilder, type GuildMember, type PartialGuildMember }
  from "discord.js";
import { errorHandler } from "../../utils/errorHandler.js";
import type { ExtendedClient } from "../../interfaces/extendedClient.js";

/**
 * Logs a message to the debug hook when someone leaves the server.
 * @param camperChan - The camperChan's Discord instance.
 * @param member - The member that left the server.
 */
export const handleMemberRemove = async(
  camperChan: ExtendedClient,
  member: GuildMember | PartialGuildMember,
): Promise<void> => {
  try {
    const embed = new EmbedBuilder();
    embed.setTitle("Member Left");
    embed.setDescription(`<@!${member.id}> has left the server~!`);
    embed.addFields([
      {
        name: "Roles",
        value:
          member.roles.cache.
            map((role) => {
              return role.id === member.guild.id
                ? role.name
                : `<@&${role.id}>`;
            }).
            join(", "),
      },
    ]);
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
    await errorHandler(camperChan, "member remove event", error);
  }
};
