import {
  ActionRowBuilder,
  ButtonBuilder,
  type ButtonInteraction,
  ButtonStyle,
  ChannelType,
} from "discord.js";
import { openTicketMessage } from "../../config/ticketMessage.js";
import { errorHandler } from "../../utils/errorHandler.js";
import type { ExtendedClient } from "../../interfaces/extendedClient.js";

/**
 * Checks if a user has an open ticket. If not, creates a new ticket for them.
 * @param bot - The bot's Discord instance.
 * @param interaction - The interaction payload from Discord.
 */
export const openTicket = async(
  bot: ExtendedClient,
  interaction: ButtonInteraction<"cached">,
): Promise<void> => {
  try {
    if (!interaction.channel || interaction.channel.isThread()) {
      throw new Error("How did a ticket button end up in a null channel?");
    }
    if (interaction.channel.type !== ChannelType.GuildText) {
      throw new Error("A ticket button in a non-text channel?");
    }
    await interaction.deferReply({ ephemeral: true });
    await interaction.channel.threads.fetch();
    if (
      interaction.channel.threads.cache.some(
        (t) => {
          return t.name.includes(interaction.user.id)
          && t.archived !== true && t.locked !== true;
        },
      )
    ) {
      await interaction.editReply({
        content: "You already have a ticket open.",
      });
      return;
    }

    const button = new ButtonBuilder().
      setCustomId("ticket-close").
      setLabel("Close Ticket").
      setEmoji("❌").
      setStyle(ButtonStyle.Danger);
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

    const thread = await interaction.channel.threads.create({
      name:   `${interaction.user.displayName}-${interaction.user.id}`,
      reason: "Moderation ticket",
      type:   ChannelType.PrivateThread,
    });
    await thread.send({ components: [ row ], content: openTicketMessage });
    await thread.send({
      content: `Ticket opened by: ${interaction.user.toString()}\n/cc <@&692818623458443316>`,
    });
    await interaction.editReply({ content: "Your ticket is opened!" });
  } catch (error) {
    await errorHandler(bot, "open ticket", error);
  }
};
