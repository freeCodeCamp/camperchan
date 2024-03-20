import { PermissionFlagsBits } from "discord.js";

import { Subcommand } from "../../../interfaces/Subcommand";
import { errorHandler } from "../../../utils/errorHandler";

export const handleAddLabels: Subcommand = {
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
      const number = interaction.options.getInteger("number", true);
      const labels = interaction.options.getString("labels", true);
      const labelNames = labels.split(",").map((l) => l.trim());

      const response = await Bot.octokit.request(
        "GET /repos/{owner}/{repo}/labels",
        {
          owner: "freeCodeCamp",
          repo: repo
        }
      );

      const presentLabels = response.data.map((x) => x.name.trim());

      if (
        labelNames.every((requestedLabel) =>
          presentLabels.includes(requestedLabel)
        )
      ) {
        await Bot.octokit.issues.addLabels({
          owner: "freeCodeCamp",
          issue_number: number,
          repo,
          labels: labelNames
        });

        await interaction.editReply({
          content: `[Issue labels](<https://github.com/freeCodeCamp/${repo}/issues/${number}>) have been added: ${labelNames.join(
            ", "
          )}`
        });
      } else {
        await interaction.editReply({
          content: `${labelNames.join(", ")} were not found in the [Issue Labels List](<https://github.com/freeCodeCamp/${repo}/labels>) and will not be added to the issue.`
        });
      }
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
