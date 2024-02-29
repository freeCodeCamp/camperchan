import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

import { Subcommand } from "../../../interfaces/Subcommand";
import { errorHandler } from "../../../utils/errorHandler";

export const handleHistory: Subcommand = {
  permissionValidator: (member) =>
    [
      PermissionFlagsBits.ModerateMembers,
      PermissionFlagsBits.KickMembers,
      PermissionFlagsBits.BanMembers
    ].some((p) => member.permissions.has(p)),
  execute: async (Bot, interaction) => {
    try {
      await interaction.deferReply();
      const target = interaction.options.getUser("target", true);

      const targetRecord = await Bot.db.histories.findUnique({
        where: {
          userId: target.id
        }
      });

      if (!targetRecord) {
        await interaction.editReply({
          content: "That user is absolutely squeaky clean!"
        });
        return;
      }

      const embed = new EmbedBuilder();
      embed.setTitle(`${target.tag}'s history`);
      embed.setDescription("Here are the actions taken against this member.");
      embed.setThumbnail(target.displayAvatarURL());
      embed.addFields(
        {
          name: "Bans",
          value: String(targetRecord.bans || 0),
          inline: true
        },
        {
          name: "Kicks",
          value: String(targetRecord.kicks || 0),
          inline: true
        },
        {
          name: "Mutes",
          value: String(targetRecord.mutes || 0),
          inline: true
        },
        {
          name: "Warnings",
          value: String(targetRecord.warns || 0),
          inline: true
        },
        {
          name: "Unmutes",
          value: String(targetRecord.unmutes || 0),
          inline: true
        },
        {
          name: "Unbans",
          value: String(targetRecord.unbans || 0),
          inline: true
        }
      );

      await interaction.editReply({
        embeds: [embed]
      });
    } catch (err) {
      await errorHandler(Bot, err);
      await interaction.editReply("Something went wrong.");
    }
  }
};
