import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";

import { Camperbot } from "./Camperbot";

export interface Command {
  data:
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  run: (
    Bot: Camperbot,
    interaction: ChatInputCommandInteraction
  ) => Promise<void>;
}
