import { EmbedBuilder } from "discord.js";
import { customSubstring } from "./customSubstring.js";
import { logHandler } from "./logHandler.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";

/**
 * Generates an embed and sends it to the camperChan's debug hook.
 * @param camperChan - The camperChan's discord instance.
 * @param context - A description of where the error occurred.
 * @param error - The error to be logged.
 */
export const errorHandler = async(
  camperChan: ExtendedClient,
  context: string,
  error: unknown,
): Promise<void> => {
  if (!(error instanceof Error)) {
    logHandler.log("error", error);
    await camperChan.config.debugHook.send(String(error));
    return;
  }
  logHandler.log("error", error.message);
  const errorEmbed = new EmbedBuilder();
  errorEmbed.setTitle(`Error occurred in ${customSubstring(context, 200)}!`);
  errorEmbed.setDescription(customSubstring(error.message, 2000));
  errorEmbed.addFields([
    {
      name:  "Stack Trace:",
      value: `\`\`\`\n${customSubstring(error.stack ?? "", 1000)}\n\`\`\``,
    },
  ]);
  await camperChan.config.debugHook.send({ embeds: [ errorEmbed ] });
};
