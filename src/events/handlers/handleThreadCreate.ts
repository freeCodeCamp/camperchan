import { ThreadChannel } from "discord.js";

import { Camperbot } from "../../interfaces/Camperbot";
import { errorHandler } from "../../utils/errorHandler";

/**
 * Has the bot join a thread when it is created.
 *
 * @param {Camperbot} Bot The bot's Discord instance.
 * @param {ThreadChannel} thread The thread that was created.
 */
export const handleThreadCreate = async (
  Bot: Camperbot,
  thread: ThreadChannel
) => {
  try {
    await thread.join();
  } catch (err) {
    await errorHandler(Bot, err);
  }
};
