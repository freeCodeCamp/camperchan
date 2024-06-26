import {
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandsOnlyBuilder
} from "discord.js";

import { ExtendedClient } from "./ExtendedClient.js";
import { GuildCommandInteraction } from "./GuildCommandInteraction.js";

export interface Command {
  data: SlashCommandSubcommandsOnlyBuilder | SlashCommandOptionsOnlyBuilder;
  run: (
    CamperChan: ExtendedClient,
    interaction: GuildCommandInteraction
  ) => Promise<void>;
}
