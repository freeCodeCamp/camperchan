import { Message } from "discord.js";

import { ExtendedClient } from "../interfaces/ExtendedClient";
import { errorHandler } from "../utils/errorHandler";

/**
 * Tracks message counts in the database. To be used in our contributor reports.
 *
 * @param {ExtendedClient} CamperChan The CamperChan's Discord instance.
 * @param {Message} message The message payload from Discord.
 */
export const messageCounter = async (
  CamperChan: ExtendedClient,
  message: Message
) => {
  try {
    await CamperChan.db.messages.upsert({
      where: {
        userId: message.author.id
      },
      create: {
        userId: message.author.id,
        userTag: message.author.displayName || message.author.tag,
        messages: 1
      },
      update: {
        userTag: message.author.displayName || message.author.tag,
        messages: {
          increment: 1
        }
      }
    });
  } catch (err) {
    await errorHandler(CamperChan, "message counter module", err);
  }
};
