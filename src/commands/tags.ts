import { SlashCommandBuilder } from "@discordjs/builders";
import { GuildMember } from "discord.js";

import { Tags } from "../config/Tags";
import { Command } from "../interfaces/Command";
import { errorHandler } from "../utils/errorHandler";
import { isModerator } from "../utils/isModerator";

export const tags: Command = {
  data: new SlashCommandBuilder()
    .setName("tags")
    .setDescription("Display a commonly used canned response.")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The name of the tag to display.")
        .setRequired(true)
        .setAutocomplete(true)
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("User to ping with the tag response?")
    ),
  run: async (bot, interaction) => {
    try {
      const { member } = interaction;

      if (!member) {
        await interaction.reply({
          content: "You must be in a guild to use this command.",
          ephemeral: true,
        });
        return;
      }

      if (!isModerator(member as GuildMember)) {
        await interaction.reply({
          content: "You must be a moderator to use this command.",
          ephemeral: true,
        });
        return;
      }

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
