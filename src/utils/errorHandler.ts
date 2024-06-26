import { EmbedBuilder } from "discord.js";

import { ExtendedClient } from "../interfaces/ExtendedClient.js";

import { customSubstring } from "./customSubstring.js";
import { logHandler } from "./logHandler.js";

/**
 * Generates an embed and sends it to the CamperChan's debug hook.
 *
 * @param {ExtendedClient} CamperChan The CamperChan's discord instance.
 * @param {string} context A description of where the error occurred.
 * @param {Error} err The error to be logged.
 */
export const errorHandler = async (
  CamperChan: ExtendedClient,
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
  await CamperChan.config.debugHook.send({ embeds: [errorEmbed] });
};
