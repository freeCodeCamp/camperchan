import { ChatInputCommandInteraction } from "discord.js";

import { GuildCommandInteraction } from "../interfaces/GuildCommandInteraction.js";

/**
 * Confirms that an interaction occurred in a guild and has
 * the expected properties.
 *
 * @param {ChatInputCommandInteraction} interaction The interaction payload from Discord.
 * @returns {interaction is GuildCommandInteraction} Whether the interaction is a guild command interaction.
 */
export const isGuildCommandInteraction = (
  interaction: ChatInputCommandInteraction
): interaction is GuildCommandInteraction =>
  !!interaction.guild &&
  !!interaction.member &&
  // If permissions are a string, the payload is an APIMember object, not a GuildMember object.
  // Because we don't use HTTP based interactions, this isn't possible, so we tell TypeScript so.
  typeof interaction.member.permissions !== "string";
