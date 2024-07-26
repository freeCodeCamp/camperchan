import {
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  type GuildMember
} from "discord.js";

import { Context } from "../interfaces/Context.js";
import { errorHandler } from "../utils/errorHandler.js";
import { isModerator } from "../utils/isModerator.js";

export const translate: Context = {
  data: new ContextMenuCommandBuilder()
    .setName("translate")
    .setDMPermission(false)
    .setType(ApplicationCommandType.Message),
  run: async (bot, interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true });
      if (!isModerator(interaction.member as GuildMember)) {
        await interaction.editReply({
          content: "Translation is restricted to staff members to save costs."
        });
        return;
      }

      if (!interaction.isMessageContextMenuCommand()) {
        throw new Error("How is this not a message command????");
      }

      const message = interaction.options.getMessage("message", true);

      const translations = await bot.translator.translateText(
        message.content,
        null,
        "en-GB"
      );
      await interaction.editReply({
        content: `*Translated from ${translations.detectedSourceLang}*:\n${translations.text}`
      });
    } catch (err) {
      await errorHandler(bot, "translate context", err);
    }
  }
};
