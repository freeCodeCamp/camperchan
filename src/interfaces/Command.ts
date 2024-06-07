import {
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandsOnlyBuilder
} from "discord.js";

import { ExtendedClient } from "./ExtendedClient";
import { GuildCommandInteraction } from "./GuildCommandInteraction";

export interface Command {
  data: SlashCommandSubcommandsOnlyBuilder | SlashCommandOptionsOnlyBuilder;
  run: (
    CamperChan: ExtendedClient,
    interaction: GuildCommandInteraction
  ) => Promise<void>;
}
