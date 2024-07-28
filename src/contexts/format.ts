import { ApplicationCommandType } from "discord.js";
import { addFormatting } from "../modules/addFormatting.js";
import { errorHandler } from "../utils/errorHandler.js";
import type { Context } from "../interfaces/context.js";

export const format: Context = {
  data: {
    name: "format",
    type: ApplicationCommandType.Message,
  },
  run: async(camperChan, interaction) => {
    try {
      if (!interaction.isMessageContextMenuCommand()) {
        await interaction.reply({
          content:
            "This command is improperly configured. Please contact Naomi.",
          ephemeral: true,
        });
        return;
      }
      await interaction.deferReply();
      const message = interaction.options.getMessage("message", true);
      const formatted = await addFormatting(message);
      await interaction.editReply(formatted);
    } catch (error) {
      await errorHandler(camperChan, "format context command", error);
      await interaction.editReply("Something went wrong.");
    }
  },
};
