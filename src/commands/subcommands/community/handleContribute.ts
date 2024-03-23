import { EmbedBuilder } from "discord.js";

import { Subcommand } from "../../../interfaces/Subcommand";
import { errorHandler } from "../../../utils/errorHandler";

export const handleContribute: Subcommand = {
  permissionValidator: () => true,
  execute: async (CamperChan, interaction) => {
    try {
      await interaction.deferReply();
      const modEmbed = new EmbedBuilder().setTitle("Helpful Links!").addFields(
        {
          name: "Code of Conduct",
          value: "https://freecodecamp.org/news/code-of-conduct"
        },
        {
          name: "Moderator Handbook",
          value:
            "https://contribute.freecodecamp.org/#/flight-manuals/moderator-handbook"
        },
        {
          name: "Contributing Guidelines",
          value: "https://contribute.freecodecamp.org/"
        },
        {
          name: "News Contributing",
          value: "https://www.freecodecamp.org/news/developer-news-style-guide/"
        },
        {
          name: "Pull Request Reviews",
          value:
            "[PRs Ready for Review](https://github.com/freeCodeCamp/freeCodeCamp/pulls?q=is%3Aopen+is%3Apr+-label%3A%22status%3A+blocked%22+-label%3A%22status%3A+merge+conflict%22+status%3Asuccess+draft%3Afalse)"
        }
      );
      await interaction.editReply({ embeds: [modEmbed] });
    } catch (err) {
      await errorHandler(CamperChan, "contribute subcommand", err);
      await interaction.editReply("Something went wrong.");
    }
  }
};
