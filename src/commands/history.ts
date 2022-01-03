import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

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
        (!member.permissions.has("KICK_MEMBERS") &&
          !member.permissions.has("BAN_MEMBERS") &&
          !member.permissions.has("MODERATE_MEMBERS"))
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

      const embed = new MessageEmbed();
      embed.setTitle(`${target.tag}'s history`);
      embed.setDescription("Here are the actions taken against this member.");
      embed.setThumbnail(target.displayAvatarURL());
      embed.addField("Bans", String(targetRecord.bans), true);
      embed.addField("Kicks", String(targetRecord.kicks), true);
      embed.addField("Warnings", String(targetRecord.warns), true);
      embed.addField("Mutes", String(targetRecord.mutes), true);
      embed.addField("Unmutes", String(targetRecord.unmutes), true);

      await interaction.editReply({
        embeds: [embed],
      });
    } catch (err) {
      await errorHandler(Bot, err);
      await interaction.editReply("Something went wrong.");
    }
  },
};
