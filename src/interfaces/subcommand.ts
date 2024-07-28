import type { ExtendedClient } from "./extendedClient.js";
import type { GuildCommandInteraction } from "./guildCommandInteraction.js";
import type { GuildMember } from "discord.js";

export interface Subcommand {
  permissionValidator: (member: GuildMember)=> boolean;
  execute: (
    camperChan: ExtendedClient,
    interaction: GuildCommandInteraction
  )=> Promise<void>;
}
