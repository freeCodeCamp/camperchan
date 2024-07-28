import type { GuildCommandInteraction }
  from "../interfaces/guildCommandInteraction.js";
import type { ChatInputCommandInteraction } from "discord.js";

/**
 * Confirms that an interaction occurred in a guild and has
 * the expected properties.
 * @param interaction - The interaction payload from Discord.
 * @returns Whether the interaction is a guild command interaction.
 */
export const isGuildCommandInteraction = (
  interaction: ChatInputCommandInteraction,
): interaction is GuildCommandInteraction => {
  return Boolean(interaction.guild)
  && Boolean(interaction.member)

  /*
   * If permissions are a string, the payload is an APIMember object, not a GuildMember object.
   * Because we don't use HTTP based interactions, this isn't possible, so we tell TypeScript so.
   */
  && typeof interaction.member?.permissions !== "string";
};
