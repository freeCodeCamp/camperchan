import { ChatInputCommandInteraction, Guild, GuildMember } from "discord.js";

export interface GuildCommandInteraction extends ChatInputCommandInteraction {
  guild: Guild;
  member: GuildMember;
}
