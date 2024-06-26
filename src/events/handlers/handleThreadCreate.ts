import { EmbedBuilder, ThreadChannel } from "discord.js";

import { ExtendedClient } from "../../interfaces/ExtendedClient.js";
import { errorHandler } from "../../utils/errorHandler.js";

/**
 * Has the CamperChan join a thread when it is created.
 *
 * @param {ExtendedClient} CamperChan The CamperChan's Discord instance.
 * @param {ThreadChannel} thread The thread that was created.
 */
export const handleThreadCreate = async (
  CamperChan: ExtendedClient,
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

    await CamperChan.config.messageHook.send({ embeds: [embed] });
  } catch (err) {
    await errorHandler(CamperChan, "thread create event", err);
  }
};
