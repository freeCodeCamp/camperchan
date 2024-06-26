import { Message, EmbedBuilder, PartialMessage } from "discord.js";

import { ExtendedClient } from "../../interfaces/ExtendedClient.js";
import { customSubstring } from "../../utils/customSubstring.js";
import { errorHandler } from "../../utils/errorHandler.js";

/**
 * Handles the message delete event in Discord.
 *
 * @param {ExtendedClient} CamperChan The CamperChan's Discord instance.
 * @param {Message} message The message payload from Discord.
 */
export const handleMessageDelete = async (
  CamperChan: ExtendedClient,
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
        value: `<#${channel.id}>`
      },
      {
        name: "Content",
        value: customSubstring(
          content + stickers.map((el) => el.name).join(" ") ||
            "`No content. Embeds or attachments may be coming.`",
          1000
        )
      }
    );

    if (author) {
      deleteEmbed.setAuthor({
        name: author.tag,
        iconURL: author.displayAvatarURL()
      });
      deleteEmbed.setFooter({
        text: `ID: ${author.id}`
      });
    }

    const attached = attachments.first();
    if (attached) {
      deleteEmbed.setImage(attached.proxyURL);
    }

    await CamperChan.config.messageHook.send({ embeds: [deleteEmbed] });

    if (embeds.length) {
      embeds.forEach(
        async (embed) =>
          await CamperChan.config.messageHook.send({ embeds: [embed] })
      );
    }
  } catch (err) {
    await errorHandler(CamperChan, "message delete event", err);
  }
};
