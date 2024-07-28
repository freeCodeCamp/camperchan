import { PermissionFlagsBits } from "discord.js";
import { pullComments } from "../../../config/pullComments.js";
import { errorHandler } from "../../../utils/errorHandler.js";
import type { Subcommand } from "../../../interfaces/subcommand.js";

export const handleComment: Subcommand = {
  execute: async(camperChan, interaction) => {
    try {
      await interaction.deferReply();
      const repo = interaction.options.getString("repository", true);
      const pull = interaction.options.getInteger("number", true);
      const messageKey = interaction.options.getString("message", true);
      const message = pullComments.find((c) => {
        return c.key === messageKey;
      })?.message;

      if (message === undefined) {
        await interaction.editReply({
          content: `Could not find the ${messageKey} message.`,
        });
        return;
      }

      const comment = await camperChan.octokit.rest.issues.createComment({
        body:         message,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        issue_number: pull,
        owner:        "freeCodeCamp",
        repo:         repo,
      });

      await interaction.editReply({
        content: `Successfully added a [comment](<${comment.data.html_url}>)`,
      });
    } catch (error) {
      await errorHandler(camperChan, "comment subcommand", error);
      await interaction.editReply(
        `Something went wrong: ${
          error instanceof Error
            ? error.message
            : "Unable to parse error. Please check the logs."
        }`,
      );
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
