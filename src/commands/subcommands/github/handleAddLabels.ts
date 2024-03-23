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
  execute: async (CamperChan, interaction) => {
    try {
      await interaction.deferReply();
      const repo = interaction.options.getString("repository", true);
      const number = interaction.options.getInteger("number", true);
      const labels = interaction.options.getString("labels", true);
      const labelNames = labels.split(",").map((l) => l.trim());

      const response = await CamperChan.octokit.rest.issues.listLabelsForRepo({
        owner: "freeCodeCamp",
        repo
      });

      const presentLabels = response.data.map((x) => x.name.trim());

      if (
        !labelNames.every((requestedLabel) =>
          presentLabels.includes(requestedLabel)
        )
      ) {
        await interaction.editReply({
          content: `${labelNames.join(", ")} were not found in the [Issue Labels List](<https://github.com/freeCodeCamp/${repo}/labels>) and will not be added to the issue.`
        });
        return;
      }

      await CamperChan.octokit.issues.addLabels({
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
    } catch (err) {
      await errorHandler(CamperChan, "add labels subcommand", err);
      await interaction.editReply(
        `Something went wrong: ${
          (err as Error).message ??
          "Unable to parse error. Please check the logs."
        }`
      );
    }
  }
};
