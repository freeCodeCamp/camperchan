import { SlashCommandBuilder } from "discord.js";

import { Command } from "../interfaces/Command";
import { errorHandler } from "../utils/errorHandler";

export const userSettings: Command = {
  data: new SlashCommandBuilder()
    .setName("user-settings")
    .setDescription("Settings for your CamperChan profile")
    .setDMPermission(false),
  run: async (bot, interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true });
      await interaction.editReply({ content: "Coming soon!" });
    } catch (err) {
      await errorHandler(bot, err);
    }
  },
};
