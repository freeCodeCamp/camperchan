import type { ExtendedClient } from "./extendedClient.js";
import type { GuildCommandInteraction } from "./guildCommandInteraction.js";
import type {
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";

export interface Command {
  data: SlashCommandSubcommandsOnlyBuilder | SlashCommandOptionsOnlyBuilder;
  run: (
    camperChan: ExtendedClient,
    interaction: GuildCommandInteraction
  )=> Promise<void>;
}
