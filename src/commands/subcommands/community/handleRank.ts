import { EmbedBuilder } from "discord.js";

import { Subcommand } from "../../../interfaces/Subcommand";
import { errorHandler } from "../../../utils/errorHandler";

export const handleRank: Subcommand = {
  permissionValidator: () => true,
  execute: async (Bot, interaction) => {
    try {
      await interaction.deferReply();
      const { user } = interaction;

      const target = interaction.options.getUser("target")?.id || user.id;
      const isSelf = target === user.id;
      const name =
        interaction.options.getUser("target")?.username ||
        interaction.user.username;

      const record = await Bot.db.levels.findUnique({
        where: {
          userId: target,
        },
      });

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
