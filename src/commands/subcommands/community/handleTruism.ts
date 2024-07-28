import { truisms } from "../../../config/truisms.js";
import { errorHandler } from "../../../utils/errorHandler.js";
import type { Subcommand } from "../../../interfaces/subcommand.js";

export const handleTruism: Subcommand = {
  execute: async(camperChan, interaction) => {
    try {
      await interaction.deferReply();
      const truism
        = truisms[Math.floor(Math.random() * truisms.length)]
        ?? "Code will always break when you think it shouldn't.";
      await interaction.editReply(truism);
    } catch (error) {
      await errorHandler(camperChan, "truism subcommand", error);
    }
  },
  permissionValidator: () => {
    return true;
  },
};
