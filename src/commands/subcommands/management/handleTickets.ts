import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionFlagsBits
} from "discord.js";

import { TicketMessage } from "../../../config/TicketMessage.js";
import { Subcommand } from "../../../interfaces/Subcommand.js";
import { errorHandler } from "../../../utils/errorHandler.js";

export const handleTickets: Subcommand = {
  permissionValidator: (member) =>
    [PermissionFlagsBits.ManageGuild].some((p) => member.permissions.has(p)),
  execute: async (bot, interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true });
      const channel = interaction.options.getChannel("channel", true, [
        ChannelType.GuildText
      ]);

      const button = new ButtonBuilder()
        .setCustomId("ticket-open")
        .setLabel("Open a Ticket")
        .setEmoji("❔")
        .setStyle(ButtonStyle.Success);
      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

      await channel.send({ content: TicketMessage, components: [row] });
      await interaction.editReply({ content: "Ticket post has been created!" });
    } catch (err) {
      await errorHandler(bot, "handle tickets subcommand", err);
    }
  }
};
