import { ApplicationCommandType, Message } from "discord.js";

import { Context } from "../interfaces/Context";
import { addFormatting } from "../modules/addFormatting";
import { errorHandler } from "../utils/errorHandler";

export const format: Context = {
  data: {
    name: "format",
    type: ApplicationCommandType.Message
  },
  run: async (CamperChan, interaction) => {
    try {
      if (!interaction.isMessageContextMenuCommand()) {
        await interaction.reply({
          content:
            "This command is improperly configured. Please contact Naomi.",
          ephemeral: true
        });
        return;
      }
      await interaction.deferReply();
      const message = interaction.options.getMessage("message") as Message;
      const formatted = await addFormatting(message);
      await interaction.editReply(formatted);
    } catch (err) {
      await errorHandler(CamperChan, "format context command", err);
      await interaction.editReply("Something went wrong.");
    }
  }
};
