import { SlashCommandBuilder } from "discord.js";

import { Truisms } from "../config/Truisms";
import { Command } from "../interfaces/Command";
import { errorHandler } from "../utils/errorHandler";

export const truism: Command = {
  data: new SlashCommandBuilder()
    .setName("truism")
    .setDescription(
      "Provides a random difficult-to-swallow truth about coding."
    ),
  run: async (Bot, interaction) => {
    try {
      await interaction.deferReply();
      const truism = Truisms[Math.floor(Math.random() * Truisms.length)];
      await interaction.editReply(truism);
    } catch (err) {
      await errorHandler(Bot, err);
    }
  },
};
