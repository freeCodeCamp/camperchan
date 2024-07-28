import { errorHandler } from "../../utils/errorHandler.js";
import type { ExtendedClient } from "../../interfaces/extendedClient.js";
import type { VoiceState } from "discord.js";

/**
 * Processes the voice state update event from Discord.
 * @param camperChan - The camperChan's Discord instance.
 * @param oldState - The previous voice payload from Discord.
 * @param updatedState - The updated voice payload from Discord.
 */
export const handleVoiceStateUpdate = async(
  camperChan: ExtendedClient,
  oldState: VoiceState,
  updatedState: VoiceState,
): Promise<void> => {
  try {
    if (
      oldState.channelId === null
      && updatedState.channelId !== null
      && updatedState.channelId === camperChan.event?.channelId
      && !camperChan.event.userIds.includes(updatedState.id)
    ) {
      camperChan.event.userIds.push(updatedState.id);
    }
  } catch (error) {
    await errorHandler(camperChan, "voice state update event", error);
  }
};
