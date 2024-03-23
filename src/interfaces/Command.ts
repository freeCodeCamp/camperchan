import {
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder
} from "discord.js";

import { ExtendedClient } from "./ExtendedClient";
import { GuildCommandInteraction } from "./GuildCommandInteraction";

export interface Command {
  data:
    | SlashCommandSubcommandsOnlyBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  run: (Bot: ExtendedClient, interaction: GuildCommandInteraction) => Promise<void>;
}
