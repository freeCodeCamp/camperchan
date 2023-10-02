import { PermissionFlagsBits } from "discord.js";

import { Tags } from "../../../config/Tags";
import { Subcommand } from "../../../interfaces/Subcommand";
import { errorHandler } from "../../../utils/errorHandler";

export const handleTags: Subcommand = {
  permissionValidator: (member) =>
    [
      PermissionFlagsBits.ModerateMembers,
      PermissionFlagsBits.KickMembers,
      PermissionFlagsBits.BanMembers,
    ].some((p) => member.permissions.has(p)),
  execute: async (bot, interaction) => {
    try {
      const name = interaction.options.getString("name", true);
      const targetTag = Tags.find(
        (tag) => tag.name === name || tag.aliases.includes(name)
      );
      const user = interaction.options.getUser("user");

      if (!targetTag) {
        await interaction.reply({
          content: "That tag does not exist.",
          ephemeral: true,
        });
        return;
      }

      await interaction.reply({
        content: user
          ? `Hello <@!${user.id}>!\n\n${targetTag.message}`
          : targetTag.message,
      });
    } catch (err) {
      await errorHandler(bot, err);
      await interaction.reply("Something went wrong.");
    }
  },
};
