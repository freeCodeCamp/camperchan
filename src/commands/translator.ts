import { InteractionContextType, SlashCommandBuilder } from "discord.js";
import { languages } from "../config/languages.js";
import { errorHandler } from "../utils/errorHandler.js";
import type { Command } from "../interfaces/command.js";

export const translator: Command = {
  data: new SlashCommandBuilder().
    setName("translator").
    setDescription("Select a language you are interested in translating.").
    setContexts(InteractionContextType.Guild).
    addStringOption((option) => {
      return option.
        setName("language").
        setDescription(
          "The language you would like to add or remove from your list.",
        ).
        setRequired(true).
        setAutocomplete(true);
    }),
  run: async(camperChan, interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true });

      const lang = interaction.options.
        getString("language", true).
        toLowerCase();
      const isValidLang = languages.find((l) => {
        return l.toLowerCase() === lang;
      });
      const isValidRole = camperChan.homeGuild.roles.cache.find(
        (r) => {
          return r.name.toLowerCase() === lang;
        },
      );
      if (isValidLang === undefined) {
        await interaction.editReply({
          content: `${lang} is not one of the languages we are translating at this time.`,
        });
        return;
      }
      if (!isValidRole) {
        await interaction.editReply({
          content: `${lang} does not have a role associated with it. Please notify Naomi.`,
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
    } catch (error) {
      await errorHandler(camperChan, "translator command", error);
    }
  },
};
