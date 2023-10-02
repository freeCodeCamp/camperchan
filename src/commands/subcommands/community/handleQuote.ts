import { EmbedBuilder } from "discord.js";

import { Subcommand } from "../../../interfaces/Subcommand";
import { errorHandler } from "../../../utils/errorHandler";

export const handleQuote: Subcommand = {
  permissionValidator: () => true,
  execute: async (Bot, interaction) => {
    try {
      await interaction.deferReply();
      const quotes = Bot.quotes.motivationalQuotes;
      const compliments = Bot.quotes.compliments;
      const randomComp = Math.floor(Math.random() * compliments.length);
      const randomQuote = Math.floor(Math.random() * quotes.length);
      const quoteEmbed = new EmbedBuilder()
        .setTitle(compliments[randomComp])
        .setDescription(quotes[randomQuote].quote)
        .setFooter({ text: quotes[randomQuote].author });
      await interaction.editReply({ embeds: [quoteEmbed] });
    } catch (err) {
      await errorHandler(Bot, err);
      await interaction.editReply("Something went wrong.");
    }
  },
};
