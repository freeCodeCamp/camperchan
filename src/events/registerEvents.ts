import { ActivityFlagsBitField, Events } from "discord.js";

import { ExtendedClient } from "../interfaces/ExtendedClient";
import { errorHandler } from "../utils/errorHandler";

import { handleGuildScheduledEvents } from "./handlers/handleGuildScheduledEvents";
import { handleInteractionCreate } from "./handlers/handleInteractionCreate";
import { handleMemberAdd } from "./handlers/handleMemberAdd";
import { handleMemberRemove } from "./handlers/handleMemberRemove";
import { handleMessageCreate } from "./handlers/handleMessageCreate";
import { handleMessageDelete } from "./handlers/handleMessageDelete";
import { handleMessageEdit } from "./handlers/handleMessageEdit";
import { handleReady } from "./handlers/handleReady";
import { handleThreadCreate } from "./handlers/handleThreadCreate";
import { handleVoiceStateUpdate } from "./handlers/handleVoiceStateUpdate";

const restrictedActivities = ["880218394199220334"];

/**
 * Attaches the event listeners to the CamperChan's instance.
 *
 * @param {ExtendedClient} CamperChan The CamperChan's Discord instance.
 */
export const registerEvents = async (CamperChan: ExtendedClient) => {
  try {
    CamperChan.on(
      Events.ClientReady,
      async () => await handleReady(CamperChan)
    );
    CamperChan.on(
      Events.MessageCreate,
      async (msg) => await handleMessageCreate(CamperChan, msg)
    );
    CamperChan.on(
      Events.MessageUpdate,
      async (oldMsg, newMsg) =>
        await handleMessageEdit(CamperChan, oldMsg, newMsg)
    );
    CamperChan.on(
      Events.MessageDelete,
      async (msg) => await handleMessageDelete(CamperChan, msg)
    );
    CamperChan.on(
      Events.InteractionCreate,
      async (interaction) =>
        await handleInteractionCreate(CamperChan, interaction)
    );
    CamperChan.on(
      Events.ThreadCreate,
      async (thread) => await handleThreadCreate(CamperChan, thread)
    );
    CamperChan.on(
      Events.GuildMemberAdd,
      async (member) => await handleMemberAdd(CamperChan, member)
    );
    CamperChan.on(
      Events.GuildMemberRemove,
      async (member) => await handleMemberRemove(CamperChan, member)
    );
    CamperChan.on(Events.Error, async (err) => {
      await errorHandler(CamperChan, "client error event", err);
    });
    CamperChan.on(
      Events.VoiceStateUpdate,
      async (oldState, newState) =>
        await handleVoiceStateUpdate(CamperChan, oldState, newState)
    );
    CamperChan.on(
      Events.GuildScheduledEventUpdate,
      async (oldEvent, newEvent) => {
        if (!oldEvent || !newEvent) {
          return;
        }
        await handleGuildScheduledEvents(CamperChan, oldEvent, newEvent);
      }
    );
    CamperChan.on(Events.PresenceUpdate, async (_old, newPresence) => {
      const embeddedActivity = newPresence.activities.find((a) =>
        a.flags.has(ActivityFlagsBitField.Flags.Embedded)
      );
      if (
        !embeddedActivity ||
        !embeddedActivity.applicationId ||
        !restrictedActivities.includes(embeddedActivity.applicationId) ||
        !newPresence.member
      ) {
        return;
      }
      await newPresence.member.voice.disconnect();
    });
  } catch (err) {
    await errorHandler(CamperChan, "register events", err);
  }
};
