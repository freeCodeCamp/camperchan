import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

import { Camperbot } from "./Camperbot";

export interface Command {
  data:
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  run: (Bot: Camperbot, interaction: CommandInteraction) => Promise<void>;
}
