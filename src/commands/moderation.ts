import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";

import { Command } from "../interfaces/Command";
import { Subcommand } from "../interfaces/Subcommand";
import { errorHandler } from "../utils/errorHandler";

import { handleBan } from "./subcommands/moderation/handleBan";
import { handleHistory } from "./subcommands/moderation/handleHistory";
import { handleKick } from "./subcommands/moderation/handleKick";
import { handleMute } from "./subcommands/moderation/handleMute";
import { handlePrune } from "./subcommands/moderation/handlePrune";
import { handleUnban } from "./subcommands/moderation/handleUnban";
import { handleUnmute } from "./subcommands/moderation/handleUnmute";
import { handleWarn } from "./subcommands/moderation/handleWarn";

const handlers: { [key: string]: Subcommand } = {
  ban: handleBan,
  history: handleHistory,
  kick: handleKick,
  mute: handleMute,
  prune: handlePrune,
  unban: handleUnban,
  unmute: handleUnmute,
  warn: handleWarn,
};

export const moderation: Command = {
  data: new SlashCommandBuilder()
    .setName("moderation")
    .setDescription("Moderation commands.")
    .setDMPermission(false)
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("ban")
        .setDescription("Bans a user from the server.")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("The user to ban.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("reason")
            .setDescription("The reason for banning the user.")
            .setRequired(true)
        )
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("history")
        .setDescription("Views the moderation history of a user.")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("The user to view the moderation history of.")
            .setRequired(true)
        )
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("kick")
        .setDescription("Kicks a user from the server.")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("The user to kick.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("reason")
            .setDescription("The reason for kicking the user.")
            .setRequired(true)
        )
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("mute")
        .setDescription("Mutes a user.")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("The user to mute.")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("duration")
            .setDescription("The length of time to mute the user.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("unit")
            .setDescription("The unit of time for the duration.")
            .setRequired(true)
            .addChoices(
              {
                name: "Minutes",
                value: "minutes",
              },
              {
                name: "Hours",
                value: "hours",
              },
              {
                name: "Days",
                value: "days",
              },
              {
                name: "Weeks",
                value: "weeks",
              }
            )
        )
        .addStringOption((option) =>
          option
            .setName("reason")
            .setDescription("The reason for muting the user.")
            .setRequired(true)
        )
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("prune")
        .setDescription("Prunes messages from THIS channel.")
        .addIntegerOption((option) =>
          option
            .setName("count")
            .setDescription("Number of messages to delete. Maximum of 100.")
            .setMinValue(1)
            .setMaxValue(100)
            .setRequired(true)
        )
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("unban")
        .setDescription("Removes a user's ban.")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("The user to unban.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("reason")
            .setDescription("The reason for unbanning the user.")
            .setRequired(true)
        )
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("unmute")
        .setDescription("Unmutes a user.")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("The user to unmute.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("reason")
            .setDescription("The reason for unmuting the user.")
            .setRequired(true)
        )
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("warn")
        .setDescription("Issues a warning to a user.")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("The user to warn.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("reason")
            .setDescription("The reason for issuing this warning.")
            .setRequired(true)
        )
    ),
  run: async (bot, interaction) => {
    try {
      const handler = handlers[interaction.options.getSubcommand(true)];
      if (!handler) {
        await interaction.reply("Invalid subcommand.");
        return;
      }
      if (!handler.permissionValidator(interaction.member)) {
        await interaction.reply("You do not have permission to do this.");
        return;
      }
      await handler.execute(bot, interaction);
    } catch (err) {
      await errorHandler(bot, err);
    }
  },
};
