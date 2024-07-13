import { PermissionFlagsBits } from "discord.js";

import {
  IssueClose,
  PullClose,
  PullComments
} from "../../../config/PullComments.js";
import { Subcommand } from "../../../interfaces/Subcommand.js";
import { errorHandler } from "../../../utils/errorHandler.js";

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
      PermissionFlagsBits.BanMembers
    ].some((p) => member.permissions.has(p)),
  execute: async (CamperChan, interaction) => {
    try {
      await interaction.deferReply();
      const repo = interaction.options.getString("repository", true);
      const number = interaction.options.getInteger("number", true);
      const comment = interaction.options.getString("comment") ?? null;
      const isSpam = interaction.options.getBoolean("spam") ?? false;

      const data = await CamperChan.octokit.rest.issues.get({
        owner: "freeCodeCamp",
        repo,
        issue_number: number
      });

      if (!data) {
        await interaction.editReply({
          content:
            "There was an error fetching that issue or pull request. Please try again later."
        });
        return;
      }
      if (data.data.state === "closed") {
        await interaction.editReply({
          content: `The [${
            data.data.pull_request ? "pull request" : "issue"
          }](<${data.data.html_url}>) is already closed.`
        });
        return;
      }
      const isPull = !!data.data.pull_request;
      await CamperChan.octokit.rest.issues.createComment({
        owner: "freeCodeCamp",
        repo,
        issue_number: number,
        body: commentBody(isPull, comment)
      });
      await CamperChan.octokit.rest.issues.update({
        owner: "freeCodeCamp",
        repo,
        issue_number: number,
        state: "closed"
      });
      if (isPull && isSpam) {
        await CamperChan.octokit.rest.issues.addLabels({
          owner: "freeCodeCamp",
          repo,
          issue_number: number,
          labels: ["spam"]
        });
      }
      await interaction.editReply({
        content: `Successfully closed the [${
          isPull ? "pull request" : "issue"
        }](<${data.data.html_url}>).`
      });
    } catch (err) {
      await errorHandler(CamperChan, "close subcommand", err);
      await interaction.editReply(
        `Something went wrong: ${
          (err as Error).message ??
          "Unable to parse error. Please check the logs."
        }`
      );
    }
  }
};
