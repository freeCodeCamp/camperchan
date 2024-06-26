import { Truisms } from "../../../config/Truisms.js";
import { Subcommand } from "../../../interfaces/Subcommand.js";
import { errorHandler } from "../../../utils/errorHandler.js";

export const handleTruism: Subcommand = {
  permissionValidator: () => true,
  execute: async (CamperChan, interaction) => {
    try {
      await interaction.deferReply();
      const truism =
        Truisms[Math.floor(Math.random() * Truisms.length)] ??
        "Code will always break when you think it shouldn't.";
      await interaction.editReply(truism);
    } catch (err) {
      await errorHandler(CamperChan, "truism subcommand", err);
    }
  }
};
