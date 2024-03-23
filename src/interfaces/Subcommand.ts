import { GuildMember } from "discord.js";

import { ExtendedClient } from "./ExtendedClient";
import { GuildCommandInteraction } from "./GuildCommandInteraction";

export interface Subcommand {
  permissionValidator: (member: GuildMember) => boolean;
  execute: (
    CamperChan: ExtendedClient,
    interaction: GuildCommandInteraction
  ) => Promise<void>;
}
