import { ActivityFlagsBitField, Events } from "discord.js";
import { errorHandler } from "../utils/errorHandler.js";
import { handleGuildScheduledEvents }
  from "./handlers/handleGuildScheduledEvents.js";
import { handleInteractionCreate } from "./handlers/handleInteractionCreate.js";
import { handleMemberAdd } from "./handlers/handleMemberAdd.js";
import { handleMemberRemove } from "./handlers/handleMemberRemove.js";
import { handleMessageCreate } from "./handlers/handleMessageCreate.js";
import { handleMessageDelete } from "./handlers/handleMessageDelete.js";
import { handleMessageEdit } from "./handlers/handleMessageEdit.js";
import { handleReactionAdd } from "./handlers/handleReactionAdd.js";
import { handleReady } from "./handlers/handleReady.js";
import { handleThreadCreate } from "./handlers/handleThreadCreate.js";
import { handleVoiceStateUpdate } from "./handlers/handleVoiceStateUpdate.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";

const restrictedActivities = new Set([ "880218394199220334" ]);

/**
 * Attaches the event listeners to the camperChan's instance.
 * @param camperChan - The camperChan's Discord instance.
 */
export const registerEvents = async(
  camperChan: ExtendedClient,
): Promise<void> => {
  try {
    camperChan.on(Events.ClientReady, () => {
      void handleReady(camperChan);
    });
    camperChan.on(Events.MessageCreate, (message) => {
      void handleMessageCreate(camperChan, message);
    });
    camperChan.on(Events.MessageUpdate, (oldMessage, updatedMessage) => {
      void handleMessageEdit(camperChan, oldMessage, updatedMessage);
    });
    camperChan.on(Events.MessageDelete, (message) => {
      void handleMessageDelete(camperChan, message);
    });
    camperChan.on(Events.InteractionCreate, (interaction) => {
      void handleInteractionCreate(camperChan, interaction);
    });
    camperChan.on(Events.ThreadCreate, (thread) => {
      void handleThreadCreate(camperChan, thread);
    });
    camperChan.on(Events.GuildMemberAdd, (member) => {
      void handleMemberAdd(camperChan, member);
    });
    camperChan.on(Events.GuildMemberRemove, (member) => {
      void handleMemberRemove(camperChan, member);
    });
    camperChan.on(Events.Error, (error) => {
      void errorHandler(camperChan, "client error event", error);
    });
    camperChan.on(Events.VoiceStateUpdate, (oldState, updatedState) => {
      void handleVoiceStateUpdate(camperChan, oldState, updatedState);
    });
    camperChan.on(
      Events.GuildScheduledEventUpdate,
      (oldEvent, updatedEvent) => {
        if (!oldEvent) {
          return;
        }
        void handleGuildScheduledEvents(camperChan, oldEvent, updatedEvent);
      },
    );
    camperChan.on(Events.PresenceUpdate, (_old, updatedPresence) => {
      const embeddedActivity = updatedPresence.activities.find((a) => {
        return a.flags.has(ActivityFlagsBitField.Flags.Embedded);
      });
      if (
        embeddedActivity?.applicationId === null
        || embeddedActivity?.applicationId === undefined
        || !restrictedActivities.has(embeddedActivity.applicationId)
        || !updatedPresence.member
      ) {
        return;
      }
      void updatedPresence.member.voice.disconnect();
    });
    camperChan.on(Events.MessageBulkDelete, (messages) => {
      for (const message of messages.values()) {
        void handleMessageDelete(camperChan, message);
      }
    });
    camperChan.on(Events.MessageReactionAdd, (reaction) => {
      if (!reaction.message.inGuild() || reaction.partial) {
        return;
      }
      void handleReactionAdd(camperChan, reaction);
    });
  } catch (error) {
    await errorHandler(camperChan, "register events", error);
  }
};
