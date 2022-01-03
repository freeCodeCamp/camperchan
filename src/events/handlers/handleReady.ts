import { Camperbot } from "../../interfaces/Camperbot";
import { errorHandler } from "../../utils/errorHandler";

/**
 * Logs a message to the debug hook when the bot is online.
 *
 * @param {Camperbot} Bot The bot's Discord instance.
 */
export const handleReady = async (Bot: Camperbot) => {
  try {
    await Bot.config.debug_hook.send("Bot Ready!");
  } catch (err) {
    await errorHandler(Bot, err);
  }
};
