import {
  ActionRowBuilder,
  ComponentType,
  GuildMember,
  Message,
  StringSelectMenuBuilder
} from "discord.js";

import { Tags } from "../config/Tags";
import { Context } from "../interfaces/Context";
import { errorHandler } from "../utils/errorHandler";
import { isModerator } from "../utils/isModerator";

export const snippet: Context = {
  data: {
    name: "snippet",
    type: 3
  },
  run: async (bot, interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true });
      if (
        !interaction.member ||
        !isModerator(interaction.member as GuildMember)
      ) {
        await interaction.editReply({
          content: "Only moderators may use this command."
        });
        return;
      }
      const message = interaction.options.getMessage(
        "message",
        true
      ) as Message;

      const dropdown = new StringSelectMenuBuilder()
        .setCustomId("snippets")
        .addOptions(
          ...Tags.map(({ name }) => ({
            label: name,
            value: name
          }))
        )
        .setMaxValues(1)
        .setMinValues(1);
      const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
        dropdown
      );

      const response = await interaction.editReply({
        content: "Which snippet would you like to send?",
        components: [row]
      });

      const collector =
        response.createMessageComponentCollector<ComponentType.StringSelect>({
          time: 1000 * 60 * 60
        });

      collector.on("collect", async (selection) => {
        await selection.deferUpdate();
        const name = selection.values[0];
        const target = Tags.find((t) => t.name === name);
        if (!target) {
          await selection.editReply({
            content: `Cannot find a snippet with the name ${name}.`
          });
          return;
        }
        await message.reply({
          content: target.message
        });
        await interaction.editReply({
          content: "Response sent!",
          components: []
        });
      });

      collector.on("end", async () => {
        /**
         * Ephemerals can be dismissed by the user.
         * We catch the error here because we don't really
         * care if it fails.
         */
        await interaction
          .editReply({
            components: []
          })
          .catch(() => null);
      });
    } catch (err) {
      await errorHandler(bot, err);
    }
  }
};
