import { errorHandler } from "../../utils/errorHandler.js";
import type { ExtendedClient } from "../../interfaces/extendedClient.js";
import type { MessageReaction } from "discord.js";

/**
 * Posts to the starboard webhook.
 * @param camperChan - The bot's Discord instance.
 * @param reaction - The reaction payload from Discord.
 */
export const handleReactionAdd = async(
  camperChan: ExtendedClient,
  reaction: MessageReaction,
): Promise<void> => {
  try {
    if (reaction.emoji.name !== "⭐") {
      return;
    }
    if (reaction.count < 2) {
      return;
    }
    const message = await reaction.message.fetch();
    if (message.guild?.id !== camperChan.config.homeGuild) {
      return;
    }
    const isPosted = await camperChan.db.starboard.findUnique({
      where: { messageId: reaction.message.id },
    });
    if (isPosted) {
      return;
    }

    await camperChan.config.starboardHook.send({
      avatarURL: message.author.displayAvatarURL(),
      content:   message.content,
      embeds:    message.embeds,
      files:     message.attachments.map((attachment) => {
        return attachment.url;
      }),
      username: message.author.username,
    });
    await camperChan.db.starboard.create({
      data: {
        messageId: reaction.message.id,
      },
    });
  } catch (error) {
    await errorHandler(camperChan, "reaction add event", error);
  }
};
