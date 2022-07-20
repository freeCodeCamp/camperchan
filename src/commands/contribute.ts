import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";

import { Command } from "../interfaces/Command";
import { errorHandler } from "../utils/errorHandler";

export const contribute: Command = {
  data: new SlashCommandBuilder()
    .setName("contribute")
    .setDescription(
      "Returns helpful links for folks interested in contributing."
    ),
  run: async (Bot, interaction) => {
    try {
      await interaction.deferReply();
      const modEmbed = new EmbedBuilder().setTitle("Helpful Links!").addFields(
        {
          name: "Code of Conduct",
          value: "https://freecodecamp.org/news/code-of-conduct",
        },
        {
          name: "Moderator Handbook",
          value:
            "https://contribute.freecodecamp.org/#/flight-manuals/moderator-handbook",
        },
        {
          name: "Contributing Guidelines",
          value: "https://contribute.freecodecamp.org/",
        },
        {
          name: "News Contributing",
          value:
            "https://www.freecodecamp.org/news/developer-news-style-guide/",
        },
        {
          name: "Pull Request Reviews",
          value:
            "[PRs Ready for Review](https://github.com/freeCodeCamp/freeCodeCamp/pulls?q=is%3Aopen+is%3Apr+-label%3A%22status%3A+blocked%22+-label%3A%22status%3A+merge+conflict%22+status%3Asuccess+draft%3Afalse)",
        }
      );
      await interaction.editReply({ embeds: [modEmbed] });
    } catch (err) {
      await errorHandler(Bot, err);
      await interaction.editReply("Something went wrong.");
    }
  },
};
