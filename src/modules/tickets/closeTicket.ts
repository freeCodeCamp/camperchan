import { ButtonInteraction } from "discord.js";

import { closeTicketMessage } from "../../config/TicketMessage";
import { ExtendedClient } from "../../interfaces/ExtendedClient";
import { errorHandler } from "../../utils/errorHandler";

/**
 * Closes a ticket, removing the user.
 *
 * @param {ExtendedClient} bot The bot's Discord instance.
 * @param {ButtonInteraction} interaction The interaction payload from Discord.
 */
export const closeTicket = async (
  bot: ExtendedClient,
  interaction: ButtonInteraction<"cached">
) => {
  try {
    if (!interaction.channel || !interaction.channel.isThread()) {
      throw new Error("How did a ticket not end up in a thread?");
    }
    await interaction.deferReply({ ephemeral: true });
    const id = interaction.channel.name.split("-").at(-1);
    await interaction.channel.members.remove(id ?? "");
    await interaction.channel.send({ content: closeTicketMessage });
    await interaction.channel.setLocked();
    await interaction.editReply({ content: "Ticket closed!" });
  } catch (err) {
    await errorHandler(bot, "open ticket", err);
  }
};
