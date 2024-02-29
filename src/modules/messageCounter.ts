import { Message } from "discord.js";

import { Camperbot } from "../interfaces/Camperbot";
import { errorHandler } from "../utils/errorHandler";

/**
 * Tracks message counts in the database. To be used in our contributor reports.
 *
 * @param {Camperbot} bot The bot's Discord instance.
 * @param {Message} message The message payload from Discord.
 */
export const messageCounter = async (bot: Camperbot, message: Message) => {
  try {
    await bot.db.messages.upsert({
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
    await errorHandler(bot, err);
  }
};
