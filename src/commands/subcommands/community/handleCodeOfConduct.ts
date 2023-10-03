import { EmbedBuilder } from "discord.js";

import { Subcommand } from "../../../interfaces/Subcommand";
import { errorHandler } from "../../../utils/errorHandler";

export const handleCodeOfConduct: Subcommand = {
  permissionValidator: () => true,
  execute: async (Bot, interaction) => {
    try {
      await interaction.deferReply();
      const codeEmbed = new EmbedBuilder()
        .setTitle("freeCodeCamp Code of Conduct")
        .setDescription(
          "These are the basic rules for interacting with the FreeCodeCamp community on any platform, including this Discord server. You can read the full document on the [FreeCodeCamp article](https://freecodecamp.org/news/code-of-conduct)"
        )
        .addFields(
          {
            name: "No harassment",
            value:
              "Harassment includes sexual language and imagery, deliberate intimidation, stalking, name-calling, unwelcome attention, libel, and any malicious hacking or social engineering. freeCodeCamp should be a harassment-free experience for everyone, regardless of gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, national origin, or religion (or lack thereof).",
          },
          {
            name: "No trolling",
            value:
              "Trolling includes posting inflammatory comments to provoke an emotional response or disrupt discussions.",
          },
          {
            name: "No spamming",
            value:
              "Spamming includes posting off-topic messages to disrupt discussions, promoting a product, soliciting donations, advertising a job / internship / gig, or flooding discussions with files or text.",
          }
        )
        .setFooter({
          text: "Thank you for following freeCodeCamp's Code of Conduct",
        })
        .setURL("https://freecodecamp.org/news/code-of-conduct");
      await interaction.editReply({ embeds: [codeEmbed] });
    } catch (err) {
      await errorHandler(Bot, err);
      await interaction.editReply("Something went wrong.");
    }
  },
};
