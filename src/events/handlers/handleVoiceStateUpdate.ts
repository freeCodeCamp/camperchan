import { VoiceState } from "discord.js";

import { ExtendedClient } from "../../interfaces/ExtendedClient.js";
import { errorHandler } from "../../utils/errorHandler.js";

/**
 * Processes the voice state update event from Discord.
 *
 * @param {ExtendedClient} CamperChan The CamperChan's Discord instance.
 * @param {VoiceState} oldState The previous voice payload from Discord.
 * @param {VoiceState} newState The updated voice payload from Discord.
 */
export const handleVoiceStateUpdate = async (
  CamperChan: ExtendedClient,
  oldState: VoiceState,
  newState: VoiceState
) => {
  try {
    if (
      !oldState.channelId &&
      newState.channelId &&
      newState.channelId === CamperChan.event?.channelId &&
      !CamperChan.event.userIds.includes(newState.id)
    ) {
      CamperChan.event.userIds.push(newState.id);
    }
  } catch (err) {
    await errorHandler(CamperChan, "voice state update event", err);
  }
};
