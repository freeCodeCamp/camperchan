import { EmbedBuilder } from "discord.js";
import { errorHandler } from "../../../utils/errorHandler.js";
import type { Subcommand } from "../../../interfaces/subcommand.js";

export const handleQuote: Subcommand = {
  execute: async(camperChan, interaction) => {
    try {
      await interaction.deferReply();
      const quotes = camperChan.quotes.motivationalQuotes;
      const { compliments } = camperChan.quotes;
      const randomComp = Math.floor(Math.random() * compliments.length);
      const randomQuote = Math.floor(Math.random() * quotes.length);
      const quoteEmbed = new EmbedBuilder().
        setTitle(compliments[randomComp] ?? "No data found").
        setDescription(
          quotes[randomQuote]?.quote ?? "I probably broke something again.",
        ).
        setFooter({ text: quotes[randomQuote]?.author ?? "Naomi Carrigan" });
      await interaction.editReply({ embeds: [ quoteEmbed ] });
    } catch (error) {
      await errorHandler(camperChan, "quote subcommand", error);
      await interaction.editReply("Something went wrong.");
    }
  },
  permissionValidator: () => {
    return true;
  },
};
