import { Message, EmbedBuilder, PartialMessage } from "discord.js";

import { Camperbot } from "../../interfaces/Camperbot";
import { customSubstring } from "../../utils/customSubstring";
import { errorHandler } from "../../utils/errorHandler";

/**
 * Handles the message delete event in Discord.
 *
 * @param {Camperbot} Bot The bot's Discord instance.
 * @param {Message} message The message payload from Discord.
 */
export const handleMessageDelete = async (
  Bot: Camperbot,
  message: Message | PartialMessage
) => {
  try {
    const { author, channel, content, guild, embeds, attachments, stickers } =
      message;

    if (!guild) {
      return;
    }

    const deleteEmbed = new EmbedBuilder();
    deleteEmbed.setTitle("Message Deleted");
    deleteEmbed.setDescription("Here is my record of that message.");
    deleteEmbed.addFields(
      {
        name: "Channel",
        value: `<#${channel.id}>`,
      },
      {
        name: "Content",
        value: customSubstring(
          content + stickers.map((el) => el.name).join(" ") ||
            "`No content. Embeds or attachments may be coming.`",
          1000
        ),
      }
    );

    if (author) {
      deleteEmbed.setAuthor({
        name: author.tag,
        iconURL: author.displayAvatarURL(),
      });
      deleteEmbed.setFooter({
        text: `ID: ${author.id}`,
      });
    }

    const attached = attachments.first();
    if (attached) {
      deleteEmbed.setImage(attached.proxyURL);
    }

    await Bot.config.message_hook.send({ embeds: [deleteEmbed] });

    if (embeds.length) {
      embeds.forEach(
        async (embed) => await Bot.config.message_hook.send({ embeds: [embed] })
      );
    }
  } catch (err) {
    await errorHandler(Bot, err);
  }
};
