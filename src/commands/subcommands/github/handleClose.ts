import { PermissionFlagsBits } from "discord.js";

import {
  IssueClose,
  PullClose,
  PullComments,
} from "../../../config/PullComments";
import { Subcommand } from "../../../interfaces/Subcommand";
import { errorHandler } from "../../../utils/errorHandler";

const commentBody = (isPull: boolean, comment: string | null) => {
  return (
    PullComments.find((c) => c.key === comment)?.message ??
    (isPull ? PullClose : IssueClose)
  );
};

export const handleClose: Subcommand = {
  permissionValidator: (member) =>
    [
      PermissionFlagsBits.ModerateMembers,
      PermissionFlagsBits.KickMembers,
      PermissionFlagsBits.BanMembers,
    ].some((p) => member.permissions.has(p)),
  execute: async (Bot, interaction) => {
    try {
      await interaction.deferReply();
      const repo = interaction.options.getString("repository", true);
      const number = interaction.options.getInteger("number", true);
      const comment = interaction.options.getString("comment") ?? null;
      const isSpam = interaction.options.getBoolean("spam") ?? false;

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
      if (data.data.state === "closed") {
        await interaction.editReply({
          content: `The [${
            data.data.pull_request ? "pull request" : "issue"
          }](<${data.data.html_url}>) is already closed.`,
        });
        return;
      }
      const isPull = !!data.data.pull_request;
      await Bot.octokit.issues.createComment({
        owner: "freeCodeCamp",
        repo,
        issue_number: number,
        body: commentBody(isPull, comment),
      });
      await Bot.octokit.issues.update({
        owner: "freeCodeCamp",
        repo,
        issue_number: number,
        state: "closed",
      });
      if (isPull && isSpam) {
        await Bot.octokit.issues.addLabels({
          owner: "freeCodeCamp",
          repo,
          issue_number: number,
          labels: ["spam"],
        });
      }
      await interaction.editReply({
        content: `Successfully closed the [${
          isPull ? "pull request" : "issue"
        }](<${data.data.html_url}>).`,
      });
    } catch (err) {
      await errorHandler(Bot, err);
      await interaction.editReply("Something went wrong.");
    }
  },
};
