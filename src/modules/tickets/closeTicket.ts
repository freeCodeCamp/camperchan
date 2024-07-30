import { closeTicketMessage } from "../../config/ticketMessage.js";
import { errorHandler } from "../../utils/errorHandler.js";
import type { ExtendedClient } from "../../interfaces/extendedClient.js";
import type { ButtonInteraction } from "discord.js";

/**
 * Closes a ticket, removing the user.
 * @param bot - The bot's Discord instance.
 * @param interaction - The interaction payload from Discord.
 */
export const closeTicket = async(
  bot: ExtendedClient,
  interaction: ButtonInteraction<"cached">,
): Promise<void> => {
  try {
    if (interaction.channel?.isThread() !== true) {
      throw new Error("How did a ticket not end up in a thread?");
    }
    await interaction.deferReply({ ephemeral: true });
    const id = interaction.channel.name.split("-").at(-1);
    await interaction.channel.members.remove(id ?? "");
    await interaction.channel.send({ content: closeTicketMessage });
    await interaction.channel.setLocked();
    await interaction.editReply({ content: "Ticket closed!" });
    await interaction.channel.setArchived(true);
  } catch (error) {
    await errorHandler(bot, "open ticket", error);
  }
};
