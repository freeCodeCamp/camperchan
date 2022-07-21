import { EmbedBuilder } from "discord.js";

import { Camperbot } from "../interfaces/Camperbot";

import { logHandler } from "./logHandler";

/**
 * Generates an embed and sends it to the Bot's debug hook.
 *
 * @param {Camperbot} Bot The bot's discord instance.
 * @param {Error} err The error to be logged.
 */
export const errorHandler = async (Bot: Camperbot, err: unknown) => {
  const error = err as Error;
  logHandler.log("error", error.message);
  const errorEmbed = new EmbedBuilder();
  errorEmbed.setTitle(`Error occurred!`);
  errorEmbed.setDescription(`${error.message}`);
  errorEmbed.addFields({
    name: "Stack Trace:",
    value: `\`\`\`\n${error.stack}\n\`\`\``,
  });
  await Bot.config.debug_hook.send({ embeds: [errorEmbed] });
};
