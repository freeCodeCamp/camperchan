import { EmbedBuilder } from "@discordjs/builders";
import { SlashCommandBuilder } from "discord.js";

import LevelModel from "../database/models/LevelModel";
import { Command } from "../interfaces/Command";
import { errorHandler } from "../utils/errorHandler";

export const rank: Command = {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("See your level in our community.")
    .addUserOption((option) =>
      option.setName("target").setDescription("The user to check the level of.")
    ),
  run: async (Bot, interaction) => {
    try {
      const { guildId, guild, user } = interaction;

      if (!guildId || !guild) {
        await interaction.editReply({
          content: "This command can only be used in a guild.",
        });
        return;
      }

      const target = interaction.options.getUser("target") || user;
      const isSelf = target.id === interaction.user.id;
      const name =
        interaction.options.getUser("target")?.username ||
        interaction.user.username;

      const record = await LevelModel.findOne({ userId: target });

      if (!record) {
        await interaction.editReply({
          content: isSelf
            ? "You haven't earned any levels yet. You should interact with the community more!"
            : "They haven't earned any levels yet. Try reaching out to them!",
        });
        return;
      }

      const levelEmbed = new EmbedBuilder();
      levelEmbed.setTitle(`${name}'s Level`);
      levelEmbed.addFields([
        {
          name: "Experience",
          value: record.points.toString(),
          inline: true,
        },
        {
          name: "Level",
          value: record.level.toString(),
          inline: true,
        },
        {
          name: "Last Seen",
          value: `${new Date(record.lastSeen).toLocaleDateString()}`,
        },
      ]);

      await interaction.editReply({
        embeds: [levelEmbed],
      });
    } catch (err) {
      await errorHandler(Bot, err);
    }
  },
};
