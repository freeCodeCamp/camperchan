import { SlashCommandBuilder } from "discord.js";

import { Languages } from "../config/Languages";
import { Command } from "../interfaces/Command";
import { errorHandler } from "../utils/errorHandler";

export const translator: Command = {
  data: new SlashCommandBuilder()
    .setName("translator")
    .setDescription("Select a language you are interested in translating.")
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("language")
        .setDescription(
          "The language you would like to add or remove from your list."
        )
        .setRequired(true)
        .setAutocomplete(true)
    ),
  run: async (bot, interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true });

      const lang = interaction.options
        .getString("language", true)
        .toLowerCase();
      const isValidLang = Languages.find((l) => l.toLowerCase() === lang);
      const isValidRole = bot.homeGuild.roles.cache.find(
        (r) => r.name.toLowerCase() === lang
      );
      if (!isValidLang) {
        await interaction.editReply({
          content: `${lang} is not one of the languages we are translating at this time.`
        });
        return;
      }
      if (!isValidRole) {
        await interaction.editReply({
          content: `${lang} does not have a role associated with it. Please notify Naomi.`
        });
        return;
      }

      const hasRole = interaction.member.roles.cache.has(isValidRole.id);
      if (hasRole) {
        await interaction.member.roles.remove(isValidRole.id);
        await interaction.editReply(`You are no longer in the ${lang} group.`);
        return;
      }
      await interaction.member.roles.add(isValidRole.id);
      await interaction.editReply(`You are now in the ${lang} group.`);
    } catch (err) {
      await errorHandler(bot, "translator command", err);
    }
  }
};
