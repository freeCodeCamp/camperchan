import { Events } from "discord.js";

import { Camperbot } from "../interfaces/Camperbot";
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

/**
 * Attaches the event listeners to the bot's instance.
 *
 * @param {Camperbot} Bot The bot's Discord instance.
 */
export const registerEvents = async (Bot: Camperbot) => {
  try {
    Bot.on(Events.ClientReady, async () => await handleReady(Bot));
    Bot.on(
      Events.MessageCreate,
      async (msg) => await handleMessageCreate(Bot, msg)
    );
    Bot.on(
      Events.MessageUpdate,
      async (oldMsg, newMsg) => await handleMessageEdit(Bot, oldMsg, newMsg)
    );
    Bot.on(
      Events.MessageDelete,
      async (msg) => await handleMessageDelete(Bot, msg)
    );
    Bot.on(
      Events.InteractionCreate,
      async (interaction) => await handleInteractionCreate(Bot, interaction)
    );
    Bot.on(
      Events.ThreadCreate,
      async (thread) => await handleThreadCreate(Bot, thread)
    );
    Bot.on(
      Events.GuildMemberAdd,
      async (member) => await handleMemberAdd(Bot, member)
    );
    Bot.on(
      Events.GuildMemberRemove,
      async (member) => await handleMemberRemove(Bot, member)
    );
    Bot.on(Events.Error, async (err) => {
      await errorHandler(Bot, err);
    });
    Bot.on(Events.GuildScheduledEventUpdate, async (oldEvent, newEvent) => {
      if (!oldEvent || !newEvent) {
        return;
      }
      await handleGuildScheduledEvents(Bot, oldEvent, newEvent);
    });
  } catch (err) {
    await errorHandler(Bot, err);
  }
};
