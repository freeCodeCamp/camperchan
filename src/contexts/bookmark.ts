import {
  Message,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  ButtonStyle,
  ApplicationCommandType
} from "discord.js";

import { Context } from "../interfaces/Context";
import { errorHandler } from "../utils/errorHandler";

export const bookmark: Context = {
  data: {
    name: "bookmark",
    type: ApplicationCommandType.Message
  },
  run: async (Bot, interaction): Promise<void> => {
    try {
      await interaction.deferReply({ ephemeral: true });

      const message = interaction.options.getMessage("message") as Message;

      if (!message) {
        await interaction.editReply(
          "I cannot bookmark that for you as I cannot locate the necessary records."
        );
        return;
      }

      const bookmarkEmbed = new EmbedBuilder();
      bookmarkEmbed.setTitle(`You saved a message!`);
      bookmarkEmbed.setDescription(`[View the message](${message.url})`);
      bookmarkEmbed.setFooter({
        text: "Helpful tip: Reply to this message to leave yourself a note on what you saved."
      });

      const deleteButton = new ButtonBuilder()
        .setCustomId("delete-bookmark")
        .setLabel("Delete this bookmark.")
        .setStyle(ButtonStyle.Secondary);

      const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
        deleteButton
      ]);

      await interaction.user
        .send({ embeds: [bookmarkEmbed], components: [row] })
        .then(async () => {
          await interaction.editReply(
            "I have bookmarked that message for you."
          );
        })
        .catch(async () => {
          await interaction.editReply(
            "I could not bookmark that for you. Please ensure your private messages are open."
          );
        });
    } catch (err) {
      await errorHandler(Bot, err);
      await interaction.editReply("Something went wrong.");
    }
  }
};
