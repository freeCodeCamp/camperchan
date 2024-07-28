import { errorHandler } from "../utils/errorHandler.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";
import type { Message } from "discord.js";

/**
 * Tracks message counts in the database. To be used in our contributor reports.
 * @param camperChan - The camperChan's Discord instance.
 * @param message - The message payload from Discord.
 */
export const messageCounter = async(
  camperChan: ExtendedClient,
  message: Message,
): Promise<void> => {
  try {
    await camperChan.db.messages.upsert({
      create: {
        messages: 1,
        userId:   message.author.id,
        userTag:  message.author.displayName,
      },
      update: {
        messages: {
          increment: 1,
        },
        userTag: message.author.displayName,
      },
      where: {
        userId: message.author.id,
      },
    });
  } catch (error) {
    await errorHandler(camperChan, "message counter module", error);
  }
};
