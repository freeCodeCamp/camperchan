import { VoiceState } from "discord.js";

import { Camperbot } from "../../interfaces/Camperbot";
import { errorHandler } from "../../utils/errorHandler";

/**
 * Processes the voice state update event from Discord.
 *
 * @param {Camperbot} bot The bot's Discord instance.
 * @param {VoiceState} oldState The previous voice payload from Discord.
 * @param {VoiceState} newState The updated voice payload from Discord.
 */
export const handleVoiceStateUpdate = async (
  bot: Camperbot,
  oldState: VoiceState,
  newState: VoiceState
) => {
  try {
    if (
      !oldState.channelId &&
      newState.channelId &&
      newState.channelId === bot.event?.channelId &&
      !bot.event.userIds.includes(newState.id)
    ) {
      bot.event.userIds.push(newState.id);
    }
  } catch (err) {
    await errorHandler(bot, err);
  }
};
