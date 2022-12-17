import { Camperbot } from "../interfaces/Camperbot";
import { errorHandler } from "../utils/errorHandler";

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
    Bot.on("ready", async () => await handleReady(Bot));
    Bot.on("messageCreate", async (msg) => await handleMessageCreate(Bot, msg));
    Bot.on(
      "messageUpdate",
      async (oldMsg, newMsg) => await handleMessageEdit(Bot, oldMsg, newMsg)
    );
    Bot.on("messageDelete", async (msg) => await handleMessageDelete(Bot, msg));
    Bot.on(
      "interactionCreate",
      async (interaction) => await handleInteractionCreate(Bot, interaction)
    );
    Bot.on(
      "threadCreate",
      async (thread) => await handleThreadCreate(Bot, thread)
    );
    Bot.on(
      "guildMemberAdd",
      async (member) => await handleMemberAdd(Bot, member)
    );
    Bot.on(
      "guildMemberRemove",
      async (member) => await handleMemberRemove(Bot, member)
    );
  } catch (err) {
    await errorHandler(Bot, err);
  }
};
