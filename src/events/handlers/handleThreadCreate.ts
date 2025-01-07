import { EmbedBuilder, type ThreadChannel } from "discord.js";
import { errorHandler } from "../../utils/errorHandler.js";
import type { ExtendedClient } from "../../interfaces/extendedClient.js";

/**
 * Has the camperChan join a thread when it is created.
 * @param camperChan - The camperChan's Discord instance.
 * @param thread - The thread that was created.
 */
export const handleThreadCreate = async(
  camperChan: ExtendedClient,
  thread: ThreadChannel,
): Promise<void> => {
  try {
    // eslint-disable-next-line unicorn/require-array-join-separator -- This is a Discord.js method, not an <Array>.join().
    await thread.join();

    const embed = new EmbedBuilder();
    embed.setTitle("Thread Created");
    embed.setDescription(`The thread <#${thread.id}> was created.`);
    embed.addFields([
      { inline: true, name: "Created By:", value: `<@!${String(thread.ownerId)}>` },
      { inline: true, name: "Channel:", value: `<#${String(thread.parentId)}>` },
    ]);

    await camperChan.config.messageHook.send({ embeds: [ embed ] });
  } catch (error) {
    await errorHandler(camperChan, "thread create event", error);
  }
};
