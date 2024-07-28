import {
  AttachmentBuilder,
  type GuildScheduledEvent,
  GuildScheduledEventStatus,
  type PartialGuildScheduledEvent,
} from "discord.js";
import { errorHandler } from "../../utils/errorHandler.js";
import type { ExtendedClient } from "../../interfaces/extendedClient.js";

/**
 * Tracks the guild event update, caching event participation and sending result to
 * Naomi on event end.
 * @param camperChan - The camperChan's Discord instance.
 * @param oldEvent - The original event payload from Discord.
 * @param updatedEvent - The updated event payload from Discord.
 */
export const handleGuildScheduledEvents = async(
  camperChan: ExtendedClient,
  oldEvent:
    | GuildScheduledEvent
    | PartialGuildScheduledEvent,
  updatedEvent: GuildScheduledEvent,
): Promise<void> => {
  try {
    if (
      oldEvent.status === GuildScheduledEventStatus.Scheduled
      && updatedEvent.status === GuildScheduledEventStatus.Active
      && updatedEvent.channelId !== null
    ) {
      camperChan.event = {
        channelId: updatedEvent.channelId,
        end:       0,
        start:     Date.now(),
        userIds:   [],
      };
    }

    if (
      oldEvent.status === GuildScheduledEventStatus.Active
      && updatedEvent.status === GuildScheduledEventStatus.Completed
      && camperChan.event
    ) {
      camperChan.event.end = Date.now();
      const duration = Math.round(
        (camperChan.event.end - camperChan.event.start) / (1000 * 60),
      );
      const userCount = camperChan.event.userIds.length;
      const naomi
      = await updatedEvent.guild?.members.fetch("465650873650118659");
      await naomi?.send({
        files: [
          new AttachmentBuilder(
            Buffer.from(
              `Name: ${updatedEvent.name}\nStart: ${new Date(camperChan.event.start).toLocaleDateString()}\nDuration: ${String(duration)} minutes\nParticipants: ${String(userCount)}\n---\n${camperChan.event.userIds.join("\n")}`,
              "utf-8",
            ),
            { name: `event-${updatedEvent.id}.txt` },
          ),
        ],
      });
      delete camperChan.event;
    }
  } catch (error) {
    await errorHandler(camperChan, "guild scheduled events event", error);
  }
};
