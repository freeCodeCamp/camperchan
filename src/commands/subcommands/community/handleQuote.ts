import { EmbedBuilder } from "discord.js";

import { Subcommand } from "../../../interfaces/Subcommand";
import { errorHandler } from "../../../utils/errorHandler";

export const handleQuote: Subcommand = {
  permissionValidator: () => true,
  execute: async (CamperChan, interaction) => {
    try {
      await interaction.deferReply();
      const quotes = CamperChan.quotes.motivationalQuotes;
      const compliments = CamperChan.quotes.compliments;
      const randomComp = Math.floor(Math.random() * compliments.length);
      const randomQuote = Math.floor(Math.random() * quotes.length);
      const quoteEmbed = new EmbedBuilder()
        .setTitle(compliments[randomComp] ?? "No data found")
        .setDescription(
          quotes[randomQuote]?.quote ?? "I probably broke something again."
        )
        .setFooter({ text: quotes[randomQuote]?.author ?? "Naomi Carrigan" });
      await interaction.editReply({ embeds: [quoteEmbed] });
    } catch (err) {
      await errorHandler(CamperChan, "quote subcommand", err);
      await interaction.editReply("Something went wrong.");
    }
  }
};
