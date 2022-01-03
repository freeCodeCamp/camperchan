import { Message } from "discord.js";

import { Context } from "../interfaces/Context";
import { addFormatting } from "../modules/addFormatting";
import { errorHandler } from "../utils/errorHandler";

export const format: Context = {
  data: {
    name: "format",
    type: 3,
  },
  run: async (Bot, interaction) => {
    try {
      await interaction.deferReply();
      const message = interaction.options.getMessage("message") as Message;
      const formatted = await addFormatting(message);
      await interaction.editReply(formatted);
    } catch (err) {
      await errorHandler(Bot, err);
      await interaction.editReply("Something went wrong.");
    }
  },
};
