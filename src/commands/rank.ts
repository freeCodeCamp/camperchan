import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

import LevelModel from "../database/models/LevelModel";
import { GuildCommand } from "../interfaces/GuildCommand";
import { errorHandler } from "../utils/errorHandler";

export const rank: GuildCommand = {
  guildOnly: true,
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("See your level in our community.")
    .addUserOption((option) =>
      option.setName("target").setDescription("The user to check the level of.")
    ),
  run: async (Bot, interaction) => {
    try {
      await interaction.deferReply();
      const { user } = interaction;

      const target = interaction.options.getUser("target")?.id || user.id;
      const isSelf = target === user.id;
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
