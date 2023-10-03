import {
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";

import { Camperbot } from "./Camperbot";
import { GuildCommandInteraction } from "./GuildCommandInteraction";

export interface Command {
  data:
    | SlashCommandSubcommandsOnlyBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  run: (Bot: Camperbot, interaction: GuildCommandInteraction) => Promise<void>;
}
