import {
  GuildScheduledEvent,
  GuildScheduledEventStatus,
  PartialGuildScheduledEvent
} from "discord.js";

import { Camperbot } from "../../interfaces/Camperbot";
import { errorHandler } from "../../utils/errorHandler";

/**
 * Tracks the guild event update, caching event participation and sending result to
 * Naomi on event end.
 *
 * @param {Camperbot} bot The bot's Discord instance.
 * @param {GuildScheduledEvent} oldEvent The original event payload from Discord.
 * @param {GuildScheduledEvent} newEvent The updated event payload from Discord.
 */
export const handleGuildScheduledEvents = async (
  bot: Camperbot,
  oldEvent:
    | GuildScheduledEvent<GuildScheduledEventStatus>
    | PartialGuildScheduledEvent,
  newEvent: GuildScheduledEvent<GuildScheduledEventStatus>
) => {
  try {
    if (
      oldEvent.status === GuildScheduledEventStatus.Scheduled &&
      newEvent.status === GuildScheduledEventStatus.Active &&
      newEvent.channelId
    ) {
      bot.event = {
        channelId: newEvent.channelId,
        userIds: [],
        start: Date.now(),
        end: 0
      };
    }

    if (
      oldEvent.status === GuildScheduledEventStatus.Active &&
      newEvent.status === GuildScheduledEventStatus.Completed &&
      bot.event
    ) {
      bot.event.end = Date.now();
      const duration = Math.round(
        (bot.event.end - bot.event.start) * 1000 * 60
      );
      const userCount = bot.event.userIds.length;
      const naomi = await newEvent.guild?.members.fetch("465650873650118659");
      await naomi?.send({
        content: `Name: ${newEvent.name}\nStart: ${new Date(bot.event.start)}\nDuration: ${duration} minutes\nParticipants: ${userCount}\n---\n${bot.event.userIds.join("\n")}`
      });
      delete bot.event;
    }
  } catch (err) {
    await errorHandler(bot, err);
  }
};
