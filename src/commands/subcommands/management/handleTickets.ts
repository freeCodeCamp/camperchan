import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionFlagsBits,
} from "discord.js";
import { ticketMessage } from "../../../config/ticketMessage.js";
import { errorHandler } from "../../../utils/errorHandler.js";
import type { Subcommand } from "../../../interfaces/subcommand.js";

export const handleTickets: Subcommand = {
  execute: async(bot, interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true });
      const channel = interaction.options.getChannel("channel", true, [
        ChannelType.GuildText,
      ]);

      const button = new ButtonBuilder().
        setCustomId("ticket-open").
        setLabel("Open a Ticket").
        setEmoji("❔").
        setStyle(ButtonStyle.Success);
      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

      await channel.send({ components: [ row ], content: ticketMessage });
      await interaction.editReply({ content: "Ticket post has been created!" });
    } catch (error) {
      await errorHandler(bot, "handle tickets subcommand", error);
    }
  },
  permissionValidator: (member) => {
    return [ PermissionFlagsBits.ManageGuild ].some((p) => {
      return member.permissions.has(p);
    });
  },
};
