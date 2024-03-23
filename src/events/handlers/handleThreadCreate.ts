import { EmbedBuilder, ThreadChannel } from "discord.js";

import { ExtendedClient } from "../../interfaces/ExtendedClient";
import { errorHandler } from "../../utils/errorHandler";

/**
 * Has the bot join a thread when it is created.
 *
 * @param {ExtendedClient} Bot The bot's Discord instance.
 * @param {ThreadChannel} thread The thread that was created.
 */
export const handleThreadCreate = async (
  Bot: ExtendedClient,
  thread: ThreadChannel
) => {
  try {
    await thread.join();

    const embed = new EmbedBuilder();
    embed.setTitle("Thread Created");
    embed.setDescription(`The thread <#${thread.id}> was created.`);
    embed.addFields([
      { name: "Created By:", value: `<@!${thread.ownerId}>`, inline: true },
      { name: "Channel:", value: `<#${thread.parentId}>`, inline: true }
    ]);

    await Bot.config.messageHook.send({ embeds: [embed] });
  } catch (err) {
    await errorHandler(Bot, "thread create event", err);
  }
};
