import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";

import { PullComments } from "../config/PullComments";
import { Command } from "../interfaces/Command";
import { Subcommand } from "../interfaces/Subcommand";
import { errorHandler } from "../utils/errorHandler";

import { handleClose } from "./subcommands/github/handleClose";
import { handleComment } from "./subcommands/github/handleComment";

const handlers: { [key: string]: Subcommand } = {
  close: handleClose,
  comment: handleComment,
};

export const github: Command = {
  data: new SlashCommandBuilder()
    .setName("github")
    .setDescription("Commands related to managing github")
    .setDMPermission(false)
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("close")
        .setDescription(
          "Close an issue or pull request under the freeCodeCamp organisation."
        )
        .addStringOption((option) =>
          option
            .setName("repository")
            .setDescription(
              "The name of the repository, under freeCodeCamp's GitHub org, to comment on"
            )
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("number")
            .setDescription("The number of the issue or pull to close.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("comment")
            .setDescription(
              "The comment to leave when closing. Defaults to the standard close message."
            )
            .addChoices(
              ...PullComments.map((c) => ({ name: c.key, value: c.key }))
            )
        )
        .addBooleanOption((option) =>
          option
            .setName("spam")
            .setDescription("Label the PR as spam for Hacktoberfest?")
        )
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("comment")
        .setDescription(
          "Adds a friendly comment to an issue or pull request. Scoped to the freeCodeCamp organisation."
        )
        .addStringOption((option) =>
          option
            .setName("repository")
            .setDescription(
              "The name of the repository, under freeCodeCamp's GitHub org, to comment on"
            )
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("number")
            .setDescription("The number of the pull request to comment on.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("message")
            .setDescription("The message to post.")
            .setRequired(true)
            .addChoices(
              ...PullComments.map((c) => ({ name: c.key, value: c.key }))
            )
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
