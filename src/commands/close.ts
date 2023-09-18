import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

import { IssueClose, PullClose } from "../config/PullComments";
import { PrivilegedCommand } from "../interfaces/PrivilegedCommand";
import { errorHandler } from "../utils/errorHandler";

export const close: PrivilegedCommand = {
  requiredPermissions: [PermissionFlagsBits.ModerateMembers],
  guildOnly: true,
  data: new SlashCommandBuilder()
    .setName("close")
    .setDescription(
      "Close an issue or pull request under the freeCodeCamp organisation."
    )
    .addStringOption((option) =>
      option
        .setName("repository")
        .setDescription(
          "The URL-friendly name of the repository to comment on. Must be a freeCodeCamp owned repository."
        )
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("number")
        .setDescription("The number of the issue or pull to close.")
        .setRequired(true)
    ),
  run: async (Bot, interaction) => {
    try {
      await interaction.deferReply();
      const repo = interaction.options.getString("repository", true);
      const number = interaction.options.getInteger("number", true);

      const data = await Bot.octokit.issues
        .get({
          owner: "freeCodeCamp",
          repo,
          issue_number: number,
        })
        .catch(() => null);

      if (!data) {
        await interaction.editReply({
          content:
            "There was an error fetching that issue or pull request. Please try again later.",
        });
        return;
      }
      const isPull = data.data.pull_request;
      await Bot.octokit.issues.createComment({
        owner: "freeCodeCamp",
        repo,
        issue_number: number,
        body: isPull ? PullClose : IssueClose,
      });
      await Bot.octokit.issues.update({
        owner: "freeCodeCamp",
        repo,
        issue_number: number,
        state: "closed",
      });
      await interaction.editReply({
        content: `Successfully closed the [${
          isPull ? "pull request" : "issue"
        }](${data.data.html_url}).`,
      });
    } catch (err) {
      await errorHandler(Bot, err);
      await interaction.editReply("Something went wrong.");
    }
  },
};
