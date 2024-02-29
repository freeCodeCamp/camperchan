import { PermissionFlagsBits } from "discord.js";

import { PullComments } from "../../../config/PullComments";
import { Subcommand } from "../../../interfaces/Subcommand";
import { errorHandler } from "../../../utils/errorHandler";

export const handleComment: Subcommand = {
  permissionValidator: (member) =>
    [
      PermissionFlagsBits.ModerateMembers,
      PermissionFlagsBits.KickMembers,
      PermissionFlagsBits.BanMembers
    ].some((p) => member.permissions.has(p)),
  execute: async (Bot, interaction) => {
    try {
      await interaction.deferReply();
      const repo = interaction.options.getString("repository", true);
      const pull = interaction.options.getInteger("number", true);
      const messageKey = interaction.options.getString("message", true);
      const message = PullComments.find((c) => c.key === messageKey)?.message;

      if (!message) {
        await interaction.editReply({
          content: `Could not find the ${messageKey} message.`
        });
        return;
      }

      const comment = await Bot.octokit.issues
        .createComment({
          owner: "freeCodeCamp",
          repo,
          issue_number: pull,
          body: message
        })
        .catch(() => null);

      if (!comment) {
        await interaction.editReply({
          content:
            "There was an error creating the comment. Please try again later."
        });
        return;
      }
      await interaction.editReply({
        content: `Successfully added a [comment](<${comment.data.html_url}>)`
      });
    } catch (err) {
      await errorHandler(Bot, err);
      await interaction.editReply(
        `Something went wrong: ${
          (err as Error).message ??
          "Unable to parse error. Please check the logs."
        }`
      );
    }
  }
};
