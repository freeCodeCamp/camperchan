import { GuildMember } from "discord.js";

import { ExtendedClient } from "./ExtendedClient.js";
import { GuildCommandInteraction } from "./GuildCommandInteraction.js";

export interface Subcommand {
  permissionValidator: (member: GuildMember) => boolean;
  execute: (
    CamperChan: ExtendedClient,
    interaction: GuildCommandInteraction
  ) => Promise<void>;
}
