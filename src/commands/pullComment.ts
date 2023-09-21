import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

import { PullComments } from "../config/PullComments";
import { PrivilegedCommand } from "../interfaces/PrivilegedCommand";
import { errorHandler } from "../utils/errorHandler";

export const pullComment: PrivilegedCommand = {
  requiredPermissions: [PermissionFlagsBits.ModerateMembers],
  guildOnly: true,
  data: new SlashCommandBuilder()
    .setName("pull-comment")
    .setDescription(
      "Adds a friendly comment to a pull request. Scoped to the freeCodeCamp organisation."
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
        .addChoices(...PullComments.map((c) => ({ name: c.key, value: c.key })))
    ),
  run: async (Bot, interaction) => {
    try {
      await interaction.deferReply();
      const repo = interaction.options.getString("repository", true);
      const pull = interaction.options.getInteger("number", true);
      const messageKey = interaction.options.getString("message", true);
      const message = PullComments.find((c) => c.key === messageKey)?.message;

      if (!message) {
        await interaction.editReply({
          content: `Could not find the ${messageKey} message.`,
        });
        return;
      }

      const comment = await Bot.octokit.issues
        .createComment({
          owner: "freeCodeCamp",
          repo,
          issue_number: pull,
          body: message,
        })
        .catch(() => null);

      if (!comment) {
        await interaction.editReply({
          content:
            "There was an error creating the comment. Please try again later.",
        });
        return;
      }
      await interaction.editReply({
        content: `Successfully added a [comment](${comment.data.html_url})`,
      });
    } catch (err) {
      await errorHandler(Bot, err);
      await interaction.editReply("Something went wrong.");
    }
  },
};
