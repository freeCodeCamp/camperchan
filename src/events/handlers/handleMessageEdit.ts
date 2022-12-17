import { Message, EmbedBuilder, PartialMessage } from "discord.js";

import { Camperbot } from "../../interfaces/Camperbot";
import { customSubstring } from "../../utils/customSubstring";
import { errorHandler } from "../../utils/errorHandler";

/**
 * Handles the message edit event from Discord.
 *
 * @param {Camperbot} Bot The bot's Discord instance.
 * @param {Message} oldMessage The old message data.
 * @param {Message} newMessage The new message data.
 */
export const handleMessageEdit = async (
  Bot: Camperbot,
  oldMessage: Message | PartialMessage,
  newMessage: Message | PartialMessage
) => {
  try {
    if (!oldMessage) {
      return;
    }
    const { author, content: newContent } = newMessage;
    const { content: oldContent } = oldMessage;

    if (oldContent && newContent && oldContent === newContent) {
      return;
    }

    const updateEmbed = new EmbedBuilder();
    updateEmbed.setTitle("Message Updated");
    updateEmbed.setAuthor({
      name: author?.tag || "unknown",
      iconURL:
        author?.displayAvatarURL() || "https:/cdn.nhcarrigan.com/profile.png",
    });
    updateEmbed.addFields(
      {
        name: "Old Content",
        value: customSubstring(oldContent || "`No content.`", 1000),
      },
      {
        name: "New Content",
        value: customSubstring(newContent || "`No content.`", 1000),
      },
      {
        name: "Channel",
        value: `<#${newMessage.channel.id}>`,
      },
      {
        name: "Message Link",
        value: newMessage.url,
      }
    );

    await Bot.config.mod_hook.send({ embeds: [updateEmbed] });
  } catch (err) {
    await errorHandler(Bot, err);
  }
};
