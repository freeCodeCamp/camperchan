import { EmbedBuilder } from "discord.js";

import { Camperbot } from "../interfaces/Camperbot";

import { logHandler } from "./logHandler";

/**
 * Generates an embed and sends it to the Bot's debug hook.
 *
 * @param {Camperbot} Bot The bot's discord instance.
 * @param {string} context A description of where the error occurred.
 * @param {Error} err The error to be logged.
 */
export const errorHandler = async (
  Bot: Camperbot,
  context: string,
  err: unknown
) => {
  const error = err as Error;
  logHandler.log("error", error.message);
  const errorEmbed = new EmbedBuilder();
  errorEmbed.setTitle(`Error occurred in ${context}!`);
  errorEmbed.setDescription(`${error.message}`);
  errorEmbed.addFields({
    name: "Stack Trace:",
    value: `\`\`\`\n${error.stack}\n\`\`\``
  });
  await Bot.config.debugHook.send({ embeds: [errorEmbed] });
};
