import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import { Camperbot } from "./Camperbot";

/**
 * A command that must be executed within a guild.
 *
 * When a command is registered as a GuildCommand, it will be wrapped such that
 * it can only be executed within the context of a guild. This also ensures that
 * the interaction has been cached.
 *
 * If the command is executed outside of a guild, an error message is provided
 * back to the calling entity.
 */
export interface GuildCommand {
  guildOnly: true;
  data:
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  run: (
    Bot: Camperbot,
    interaction: ChatInputCommandInteraction<"cached">
  ) => Promise<void>;
}
