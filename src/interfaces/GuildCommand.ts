import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Camperbot } from "./Camperbot";

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
