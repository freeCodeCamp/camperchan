import {
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  ButtonStyle,
  ApplicationCommandType,
} from "discord.js";
import { errorHandler } from "../utils/errorHandler.js";
import type { Context } from "../interfaces/context.js";

export const bookmark: Context = {
  data: {
    name: "bookmark",
    type: ApplicationCommandType.Message,
  },
  run: async(camperChan, interaction): Promise<void> => {
    try {
      if (!interaction.isMessageContextMenuCommand()) {
        await interaction.reply({
          content:
            "This command is improperly configured. Please contact Naomi.",
          ephemeral: true,
        });
        return;
      }
      await interaction.deferReply({ ephemeral: true });

      const message = interaction.options.getMessage("message", true);

      const bookmarkEmbed = new EmbedBuilder();
      bookmarkEmbed.setTitle(`You saved a message!`);
      bookmarkEmbed.setDescription(`[View the message](${message.url})`);
      bookmarkEmbed.setFooter({
        text:
        `Helpful tip: Reply to this message to leave yourself a note on what you saved.`,
      });

      const deleteButton = new ButtonBuilder().
        setCustomId("delete-bookmark").
        setLabel("Delete this bookmark.").
        setStyle(ButtonStyle.Secondary);

      const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
        deleteButton,
      ]);

      await interaction.user.
        send({ components: [ row ], embeds: [ bookmarkEmbed ] }).
        then(async() => {
          await interaction.editReply(
            "I have bookmarked that message for you.",
          );
        }).
        catch(async() => {
          await interaction.editReply(
            `I could not bookmark that for you. Please ensure your private messages are open.`,
          );
        });
    } catch (error) {
      await errorHandler(camperChan, "bookmark context command", error);
      await interaction.editReply("Something went wrong.");
    }
  },
};
