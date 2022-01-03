import { Message, MessageEmbed } from "discord.js";

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
  oldMessage: Message,
  newMessage: Message
) => {
  try {
    const { author, content: newContent } = newMessage;
    const { content: oldContent } = oldMessage;

    if (oldContent && newContent && oldContent === newContent) {
      return;
    }

    const updateEmbed = new MessageEmbed();
    updateEmbed.setTitle("Message Updated");
    updateEmbed.setAuthor({
      name: author.tag,
      iconURL: author.displayAvatarURL(),
    });
    updateEmbed.addField(
      "Old Message",
      customSubstring(oldContent || "No content here.", 1000)
    );
    updateEmbed.addField(
      "New Content",
      customSubstring(newContent || "`No content here.`", 1000)
    );
    updateEmbed.addField("Channel", `<#${newMessage.channel.id}>`);
    updateEmbed.addField("Message Link", newMessage.url);

    await Bot.config.mod_hook.send({ embeds: [updateEmbed] });
  } catch (err) {
    await errorHandler(Bot, err);
  }
};
