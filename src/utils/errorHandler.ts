import { EmbedBuilder } from "discord.js";

import { ExtendedClient } from "../interfaces/ExtendedClient";

import { customSubstring } from "./customSubstring";
import { logHandler } from "./logHandler";

/**
 * Generates an embed and sends it to the Bot's debug hook.
 *
 * @param {ExtendedClient} Bot The bot's discord instance.
 * @param {string} context A description of where the error occurred.
 * @param {Error} err The error to be logged.
 */
export const errorHandler = async (
  Bot: ExtendedClient,
  context: string,
  err: unknown
) => {
  const error = err as Error;
  logHandler.log("error", error.message);
  const errorEmbed = new EmbedBuilder();
  errorEmbed.setTitle(`Error occurred in ${customSubstring(context, 200)}!`);
  errorEmbed.setDescription(`${customSubstring(error.message, 2000)}`);
  errorEmbed.addFields([
    {
      name: "Stack Trace:",
      value: `\`\`\`\n${customSubstring(error.stack ?? "", 1000)}\n\`\`\``
    }
  ]);
  await Bot.config.debugHook.send({ embeds: [errorEmbed] });
};
