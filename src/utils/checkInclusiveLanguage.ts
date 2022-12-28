import { markdown } from "alex";
import { Message } from "discord.js";
import { VFile } from "vfile";

import { InclusiveLanguage } from "../config/InclusiveLanguage";
import { Camperbot } from "../interfaces/Camperbot";

import { errorHandler } from "./errorHandler";

/**
 * Checks that the content of a message is using inclusive language.
 *
 * @param {Camperbot} Bot The bot's Discord instance.
 * @param {Message} message The message payload from Discord to check.
 */
export const checkInclusiveLanguage = async (
  Bot: Camperbot,
  message: Message
): Promise<VFile["messages"]> => {
  try {
    const results = markdown(message.content, InclusiveLanguage);
    return results.messages;
  } catch (err) {
    await errorHandler(Bot, err);
    return [];
  }
};
