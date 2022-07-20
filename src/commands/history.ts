import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

import HistoryModel from "../database/models/HistoryModel";
import { Command } from "../interfaces/Command";
import { errorHandler } from "../utils/errorHandler";

export const history: Command = {
  data: new SlashCommandBuilder()
    .setName("history")
    .setDescription("Views the moderation history of a user.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user to view the moderation history of.")
        .setRequired(true)
    ),
  run: async (Bot, interaction) => {
    try {
      await interaction.deferReply();
      const { guild, member } = interaction;
      const target = interaction.options.getUser("target", true);

      if (!guild || !member) {
        await interaction.editReply("This command must be run in a guild.");
        return;
      }

      if (
        typeof member.permissions === "string" ||
        (!member.permissions.has(PermissionFlagsBits.KickMembers) &&
          !member.permissions.has(PermissionFlagsBits.BanMembers) &&
          !member.permissions.has(PermissionFlagsBits.ModerateMembers))
      ) {
        await interaction.editReply(
          "You do not have permission to use this command."
        );
        return;
      }

      const targetRecord = await HistoryModel.findOne({
        userId: target.id,
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
          name: "Bans",
          value: String(targetRecord.bans),
          inline: true,
        },
        {
          name: "Kicks",
          value: String(targetRecord.kicks),
          inline: true,
        },
        {
          name: "Mutes",
          value: String(targetRecord.mutes),
          inline: true,
        },
        {
          name: "Warnings",
          value: String(targetRecord.warns),
          inline: true,
        },
        {
          name: "Unmutes",
          value: String(targetRecord.unmutes),
          inline: true,
        }
      );

      await interaction.editReply({
        embeds: [embed],
      });
    } catch (err) {
      await errorHandler(Bot, err);
      await interaction.editReply("Something went wrong.");
    }
  },
};
