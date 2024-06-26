import {
  AttachmentBuilder,
  GuildScheduledEvent,
  GuildScheduledEventStatus,
  PartialGuildScheduledEvent
} from "discord.js";

import { ExtendedClient } from "../../interfaces/ExtendedClient.js";
import { errorHandler } from "../../utils/errorHandler.js";

/**
 * Tracks the guild event update, caching event participation and sending result to
 * Naomi on event end.
 *
 * @param {ExtendedClient} CamperChan The CamperChan's Discord instance.
 * @param {GuildScheduledEvent} oldEvent The original event payload from Discord.
 * @param {GuildScheduledEvent} newEvent The updated event payload from Discord.
 */
export const handleGuildScheduledEvents = async (
  CamperChan: ExtendedClient,
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
      CamperChan.event = {
        channelId: newEvent.channelId,
        userIds: [],
        start: Date.now(),
        end: 0
      };
    }

    if (
      oldEvent.status === GuildScheduledEventStatus.Active &&
      newEvent.status === GuildScheduledEventStatus.Completed &&
      CamperChan.event
    ) {
      CamperChan.event.end = Date.now();
      const duration = Math.round(
        (CamperChan.event.end - CamperChan.event.start) / (1000 * 60)
      );
      const userCount = CamperChan.event.userIds.length;
      const naomi = await newEvent.guild?.members.fetch("465650873650118659");
      await naomi?.send({
        files: [
          new AttachmentBuilder(
            Buffer.from(
              `Name: ${newEvent.name}\nStart: ${new Date(CamperChan.event.start)}\nDuration: ${duration} minutes\nParticipants: ${userCount}\n---\n${CamperChan.event.userIds.join("\n")}`,
              "utf-8"
            ),
            { name: `event-${newEvent.id}.txt` }
          )
        ]
      });
      delete CamperChan.event;
    }
  } catch (err) {
    await errorHandler(CamperChan, "guild scheduled events event", err);
  }
};
