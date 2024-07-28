import { EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { errorHandler } from "../../../utils/errorHandler.js";
import type { Subcommand } from "../../../interfaces/subcommand.js";

export const handleHistory: Subcommand = {
  execute: async(camperChan, interaction) => {
    try {
      await interaction.deferReply();
      const target = interaction.options.getUser("target", true);

      const targetRecord = await camperChan.db.histories.findUnique({
        where: {
          userId: target.id,
        },
      });

      if (!targetRecord) {
        await interaction.editReply({
          content: "That user is absolutely squeaky clean!",
        });
        return;
      }

      const embed = new EmbedBuilder();
      embed.setTitle(`${target.tag}'s history`);
      embed.setDescription("Here are the actions taken against this member.");
      embed.setThumbnail(target.displayAvatarURL());
      embed.addFields(
        {
          inline: true,
          name:   "Bans",
          value:  String(targetRecord.bans),
        },
        {
          inline: true,
          name:   "Kicks",
          value:  String(targetRecord.kicks),
        },
        {
          inline: true,
          name:   "Mutes",
          value:  String(targetRecord.mutes),
        },
        {
          inline: true,
          name:   "Warnings",
          value:  String(targetRecord.warns),
        },
        {
          inline: true,
          name:   "Unmutes",
          value:  String(targetRecord.unmutes),
        },
        {
          inline: true,
          name:   "Unbans",
          value:  String(targetRecord.unbans),
        },
      );

      await interaction.editReply({
        embeds: [ embed ],
      });
    } catch (error) {
      await errorHandler(camperChan, "history subcommand", error);
      await interaction.editReply("Something went wrong.");
    }
  },
  permissionValidator: (member) => {
    return [
      PermissionFlagsBits.ModerateMembers,
      PermissionFlagsBits.KickMembers,
      PermissionFlagsBits.BanMembers,
    ].some((p) => {
      return member.permissions.has(p);
    });
  },
};
