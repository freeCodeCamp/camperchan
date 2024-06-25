import { GuildMember } from "discord.js";

import { Context } from "../interfaces/Context";
import { errorHandler } from "../utils/errorHandler";
import { isModerator } from "../utils/isModerator";

export const translate: Context = {
  data: {
    name: "translate",
    type: 3
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
      await interaction.deferReply({ ephemeral: true });
      if (
        !interaction.member ||
        !isModerator(interaction.member as GuildMember)
      ) {
        await interaction.editReply({
          content:
            "Sorry, but only moderators may use this command. The translation API runs on Naomi's personal VPS, and we need to keep costs down. :3"
        });
        return;
      }

      const key = process.env.TRANS_KEY;
      const url = process.env.TRANS_URL;
      if (!key || !url) {
        await interaction.editReply({
          content:
            "It looks like the translation keys are not set up. Please let Naomi know."
        });
        return;
      }
      const message = interaction.options.getMessage("message", true);

      if (!message?.content) {
        await interaction.editReply({
          content: "Can't find anything to translate!"
        });
        return;
      }

      const req = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          q: message.content,
          source: "auto",
          target: "en",
          api_key: key
        })
      }).catch(
        async (err) =>
          await errorHandler(CamperChan, "translation api request", err)
      );
      if (!req || !req.ok) {
        await interaction.editReply({
          content: "Failed to query the translation API. Please let Naomi know."
        });
        return;
      }
      const res = (await req.json()) as {
        detectedLanguage: { confidence: number; language: string };
        translatedText: string;
      };

      await interaction.editReply({
        content: `*Detected ${res.detectedLanguage.language} with ${res.detectedLanguage.confidence}:\n\n${res.translatedText}`
      });
    } catch (err) {
      await errorHandler(CamperChan, "snippet context command", err);
    }
  }
};
