import { GuildMember } from "discord.js";

import { Camperbot } from "./Camperbot";
import { GuildCommandInteraction } from "./GuildCommandInteraction";

export interface Subcommand {
  permissionValidator: (member: GuildMember) => boolean;
  execute: (
    bot: Camperbot,
    interaction: GuildCommandInteraction
  ) => Promise<void>;
}
