import { Truisms } from "../../../config/Truisms";
import { Subcommand } from "../../../interfaces/Subcommand";
import { errorHandler } from "../../../utils/errorHandler";

export const handleTruism: Subcommand = {
  permissionValidator: () => true,
  execute: async (Bot, interaction) => {
    try {
      await interaction.deferReply();
      const truism = Truisms[Math.floor(Math.random() * Truisms.length)];
      await interaction.editReply(truism);
    } catch (err) {
      await errorHandler(Bot, err);
    }
  },
};
